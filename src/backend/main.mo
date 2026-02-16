import Text "mo:core/Text";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";
import OutCall "http-outcalls/outcall";
import Stripe "stripe/stripe";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Migration "migration";

(with migration = Migration.run)
actor {
  // Persisted state
  let accessControlState = AccessControl.initState();
  let eBooks = Map.empty<Text, eBook>();
  let orders = Map.empty<Text, Order>();
  let contacts = Map.empty<Nat, ContactFormSubmission>();
  let newsletters = Map.empty<Text, NewsletterSubmission>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var businessEmail : Text = "sumangowdatechpublications@gmail.com";
  var stripeConfig : ?Stripe.StripeConfiguration = null;

  // Components
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // Types
  public type UserProfile = {
    name : Text;
    email : Text;
  };

  public type eBook = {
    id : Text;
    title : Text;
    description : Text;
    price : Nat;
    coverImage : ?Storage.ExternalBlob;
    pdfFile : ?Storage.ExternalBlob;
  };

  public type Order = {
    id : Text;
    userId : Text;
    eBookId : Text;
    amount : Nat;
    status : Text; // "pending", "completed", "refunded"
    downloadCount : Nat; // Track the number of times the PDF has been downloaded
  };

  public type ContactFormSubmission = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  public type NewsletterSubmission = {
    email : Text;
    timestamp : Time.Time;
  };

  module ContactFormSubmission {
    public func compareByTimestamp(a : ContactFormSubmission, b : ContactFormSubmission) : Order.Order {
      Nat.compare(a.timestamp.toNat(), b.timestamp.toNat());
    };
  };

  // ----- User Profile Management -----
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // ----- Admin Management -----
  public shared ({ caller }) func grantAdminRole(newAdmin : Principal) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can grant admin role");
    };

    if (newAdmin.isAnonymous()) {
      Runtime.trap("Invalid: Cannot grant admin role to anonymous principal");
    };

    AccessControl.assignRole(accessControlState, caller, newAdmin, #admin);
  };

  public shared ({ caller }) func grantUserRole(user : Principal) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can grant user role");
    };

    if (user.isAnonymous()) {
      Runtime.trap("Invalid: Cannot grant user role to anonymous principal");
    };

    AccessControl.assignRole(accessControlState, caller, user, #user);
  };

  public query ({ caller }) func checkAdminStatus() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  // ----- Business Email Management -----
  public shared ({ caller }) func updateBusinessEmail(email : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update business email");
    };
    businessEmail := email;
  };

  public query func getBusinessEmail() : async Text {
    businessEmail;
  };

  // ------ Contact Form Handling --------
  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
    let id = Time.now().toNat();
    let submission : ContactFormSubmission = {
      name;
      email;
      message;
      timestamp = Time.now();
    };
    contacts.add(id, submission);
  };

  public query ({ caller }) func getAllContactSubmissions() : async [ContactFormSubmission] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view contacts");
    };

    contacts.values().toArray().sort(ContactFormSubmission.compareByTimestamp);
  };

  // ------ Newsletter Capture ----------
  public shared ({ caller }) func submitNewsletter(email : Text) : async () {
    let submission : NewsletterSubmission = {
      email;
      timestamp = Time.now();
    };
    newsletters.add(email, submission);
  };

  public query ({ caller }) func getAllNewsletterEmails() : async [Text] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view newsletter emails");
    };
    newsletters.keys().toArray();
  };

  // ---- Ebook Management --------

  public shared ({ caller }) func addOrUpdateeBook(id : Text, title : Text, description : Text, price : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can manage eBooks");
    };
    let eBookData : eBook = {
      id;
      title;
      description;
      price;
      coverImage = null;
      pdfFile = null;
    };
    eBooks.add(id, eBookData);
  };

  public shared ({ caller }) func updateseBookAsset(id : Text, assetType : Text, blob : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can manage eBook assets");
    };
    switch (eBooks.get(id)) {
      case (null) { Runtime.trap("eBook not found") };
      case (?eBookData) {
        let updatedeBook = switch (assetType) {
          case ("cover") { { eBookData with coverImage = ?blob } };
          case ("pdf") { { eBookData with pdfFile = ?blob } };
          case (_) { Runtime.trap("Invalid asset type: " # assetType) };
        };
        eBooks.add(id, updatedeBook);
      };
    };
  };

  public query func getAlleBooks() : async [eBook] {
    eBooks.values().toArray();
  };

  public query func geteBook(id : Text) : async ?eBook {
    eBooks.get(id);
  };

  // ----- Stripe Integration & Orders ----

  public query func isStripeConfigured() : async Bool {
    stripeConfig != null;
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfig := ?config;
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // ---- Order Management -------------

  public shared ({ caller }) func createOrder(id : Text, userId : Text, eBookId : Text, amount : Nat) : async () {
    let callerText = caller.toText();
    if (callerText != userId) {
      Runtime.trap("Unauthorized: Can only create orders for yourself");
    };
    let newOrder : Order = {
      id;
      userId;
      eBookId;
      amount;
      status = "pending";
      downloadCount = 0;
    };
    orders.add(id, newOrder);
  };

  public shared ({ caller }) func updateOrderStatus(id : Text, status : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update orders");
    };
    switch (orders.get(id)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        orders.add(id, { order with status });
      };
    };
  };

  public shared ({ caller }) func incrementDownloadCount(orderId : Text) : async () {
    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        // Verify the caller owns this order or is an admin
        let callerText = caller.toText();
        if (callerText != order.userId and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only increment download count for your own orders");
        };
        orders.add(orderId, {
          order with
          downloadCount = order.downloadCount + 1;
        });
      };
    };
  };

  public query ({ caller }) func getOrder(id : Text) : async ?Order {
    switch (orders.get(id)) {
      case (null) { null };
      case (?order) {
        // Verify the caller owns this order or is an admin
        let callerText = caller.toText();
        if (callerText != order.userId and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own orders");
        };
        ?order;
      };
    };
  };

  public query ({ caller }) func getAllOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    orders.values().toArray();
  };

  // ------------ Additional Functions ------------

  // Get contact submissions by email
  public shared ({ caller }) func getContactSubmissionsByEmail(email : Text) : async [ContactFormSubmission] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can access contact submissions");
    };
    contacts.values().toArray().filter(func(submission) { submission.email == email });
  };

  // Delete contact submission
  public shared ({ caller }) func deleteContactSubmission(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete submissions");
    };
    contacts.remove(id);
  };
};
