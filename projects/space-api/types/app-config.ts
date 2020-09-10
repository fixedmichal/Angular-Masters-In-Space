export interface AppConfig {
  version: string;
  features: {
    start: boolean;
    launches: boolean;
    labs: boolean;
    moons: boolean;
    martianCalendar: boolean;
  };
}
