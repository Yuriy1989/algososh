import { FC, useEffect, useState } from 'react';
import { ISteps } from '../../types/types';
import { Circle } from '../ui/circle/circle';

export const Circles: FC<{data: Array<ISteps>}> = ({data}) => {
  return (
    <>
      {/* {
        data.map((item, index) => (
          <Circle letter={item} key={index} />
        ))
      } */}
    </>
  )
}

