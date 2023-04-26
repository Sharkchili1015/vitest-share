import { Decimal } from "decimal.js-light";
import { isEqual,isEmpty } from "lodash-es";
type StringOrNull = string | null | number | Decimal;

export const isEnableToUpdateEstimateLabour = (labour:number,input:number) => {
  return (
    !isEqual(labour, input)
  );
};

export const isNullValue = (value: any): boolean => {
  return isEmpty(value);
};

export const calculateRemainingLabour = (
  estimateLabour: StringOrNull,
  actualLabour: StringOrNull
): number => {
  const remainingLabour = new Decimal(estimateLabour || 0)
    .sub(actualLabour || 0)
    .toNumber();
  return remainingLabour < 0 ? 0 : remainingLabour;
};

export const calculateTotalEstimateLabour = (
  estimateLabour: StringOrNull,
  allEstimateLabour: StringOrNull
): number | null => {
  if (isNullValue(estimateLabour)) {
    return null;
  }
  const totalEstimateLabour = new Decimal(estimateLabour || 0)
    .add(allEstimateLabour || 0)
    .toNumber();
  return totalEstimateLabour;
};
export const coverEstimateLabour = (estimate:StringOrNull,actual:StringOrNull,subtaskLabour:StringOrNull) => {
  const isNull = isNullValue(estimate);
  const remainingLabour = calculateRemainingLabour(
    estimate!,
    actual
  );
  const estimateLabour = isNull
    ? null
    : new Decimal(estimate || 0).toNumber();
  const totalEstimateLabour = calculateTotalEstimateLabour(
    estimate!,
    subtaskLabour
  );
  const data = {
    estimateLabour,
    remainingLabour,
    totalEstimateLabour,
  };
  return data;
};

// const afterNotSuccess = () => {
//   noError();
//   labourEdit.value = null;
//   return labourEdit.value;
// };

// const afterSuccess = () => {
//   currentLabourInput.value = stagingInputValue.value;
//   return currentLabourInput.value;
// };
// //父任务更新预估工时
// const currentUpdateEstimateLabour = useDebounceFn(async () => {
//   if (isEnableToUpdateEstimateLabour()) {
//     const params = coverEstimateLabour();
//     const result = await store.updateValue(params, Number(issue.value?.id));
//     result.success ? afterNotSuccess() : afterSuccess();
//   } else {
//     afterNotSuccess();
//   }
// }, 500);
