import {Button, Card, Skeleton} from "antd";
import {useState} from "react";

const SkeletonPage = ({children, isLoading}) => {
  return (
    <>
      <Skeleton loading={isLoading} active>
        {children}
      </Skeleton>
    </>
  )
}
export default SkeletonPage
