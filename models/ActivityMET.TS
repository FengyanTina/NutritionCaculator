export interface ActivityMETFactor {
    Name: string;
    METFactor: number;
    EnergyValue:number;
  }
  
  export const initialActivityMETFactor: ActivityMETFactor[] = [
    {
      Name: "Sleeping",
      METFactor: 0.95,
      EnergyValue:0,
    },
    {
      Name: "Sitting quietly watching TV",
      METFactor: 1.3,
      EnergyValue:0,
    },
    {
      Name: "Walking, less than 2.0 mph",
      METFactor: 2.0,
      EnergyValue:0,
    },
    {
      Name: "Yoga, Hatha",
      METFactor: 2.5,
      EnergyValue:0,
    },
    {
        Name: "Resistance (weight) training",
        METFactor: 3.5,
        EnergyValue:0,
      },
      {
        Name: "Bicycling, <10 mph",
        METFactor: 4.0,
        EnergyValue:0,
      },
      {
        Name: "Elliptical trainer, moderate effort",
        METFactor: 5.0,
        EnergyValue:0,
      },
      {
        Name: "Walking, 2.9 to 3.5 mph, uphill",
        METFactor: 5.3,
        EnergyValue:0,
      },
      {
        Name: "Jogging, general",
        METFactor: 7.0,
        EnergyValue:0,
      },
      {
        Name: "Circuit training, vigorous intensity",
        METFactor: 8.0,
        EnergyValue:0,
      },
      {
        Name: "Running, 6 mph (10 min/mile)",
        METFactor: 9.8,
        EnergyValue:0,
      },
      {
        Name: "Running, 8 mph (7.5 min/mile)",
        METFactor: 11.8,
        EnergyValue:0,
      },
      {
        Name: "Bicycling, 16-19 mph",
        METFactor: 12.0,
        EnergyValue:0,
      },
  ];
  