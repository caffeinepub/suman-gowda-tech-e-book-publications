module {
  // Migrate from empty actor to the main actor.
  type OldActor = {};

  // Forward migration: Keep empty state as empty record
  public func run(_old : OldActor) : {} {
    {};
  };
};
