export interface BMICategory {
    BMIClassification: string;
    BMILowValue:number;
    BMIHighValue:number;
    WeightRangeHight:number;
    WeightRangeLow:number;
  }

  export const initialBmiData:BMICategory[]=[
    {
        BMIClassification: 'Underweight(<18.5)',
        BMILowValue:0,
        BMIHighValue:18.5,
        WeightRangeHight:0,
        WeightRangeLow:0,

  },
  {
    BMIClassification: 'Healthy Weight(18.5 – 24.9)',
    BMILowValue:18.5,
    BMIHighValue:24.9,
    WeightRangeHight:0,
    WeightRangeLow:0,
  },
{
    BMIClassification: 'overweight (25.0 - 29.9)',
    BMILowValue:25.0,
    BMIHighValue:29.9,
    WeightRangeHight:0,
    WeightRangeLow:0,
},
{
    BMIClassification: 'class I obesity (30.0 - 34.9)',
    BMILowValue:30.0,
    BMIHighValue:34.9,
    WeightRangeHight:0,
    WeightRangeLow:0,
},
{
    BMIClassification: 'class II obesity (35.0 - 39.9)',
    BMILowValue:35.0,
    BMIHighValue:39.9,
    WeightRangeHight:0,
    WeightRangeLow:0,
},
{
    BMIClassification: 'class III obesity (≥ 40.0)',
    BMILowValue:40.0,
    BMIHighValue:0,
    WeightRangeHight:0,
    WeightRangeLow:0,
},
]