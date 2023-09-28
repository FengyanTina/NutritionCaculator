export interface BMICategory {
    BMIClassification: string;
    BMILowRate:number;
    BMIHighRate:number;
    WeightRangeHighValue:number;
    WeightRangeLowValue:number;
  }

  export const initialBmiData:BMICategory[]=[
    {
        BMIClassification: 'Underweight(<18.5)',
        BMILowRate:0,
        BMIHighRate:18.5,
        WeightRangeHighValue:0,
        WeightRangeLowValue:0,

  },
  {
    BMIClassification: 'Healthy Weight(18.5 – 24.9)',
    BMILowRate:18.5,
    BMIHighRate:24.9,
    WeightRangeHighValue:0,
    WeightRangeLowValue:0,
  },
{
    BMIClassification: 'overweight (25.0 - 29.9)',
    BMILowRate:25.0,
    BMIHighRate:29.9,
    WeightRangeHighValue:0,
    WeightRangeLowValue:0,
},
{
    BMIClassification: 'class I obesity (30.0 - 34.9)',
    BMILowRate:30.0,
    BMIHighRate:34.9,
    WeightRangeHighValue:0,
    WeightRangeLowValue:0,
},
{
    BMIClassification: 'class II obesity (35.0 - 39.9)',
    BMILowRate:35.0,
    BMIHighRate:39.9,
    WeightRangeHighValue:0,
    WeightRangeLowValue:0,
},
{
    BMIClassification: 'class III obesity (≥ 40.0)',
    BMILowRate:40.0,
    BMIHighRate:0,
    WeightRangeHighValue:0,
    WeightRangeLowValue:0,
},
]