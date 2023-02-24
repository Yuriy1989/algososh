import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const FibonacciPage: React.FC = () => {
  
  function twoSum(nums: number[], target: number): number[] {
    console.log("nums = ", nums, "target = ", target);
    for(let i = 0; i <= nums.length; i++) {
      const serching = target - nums[i];
    }
    return [];
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
    </SolutionLayout>
  );
};
