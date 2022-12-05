import { Button, Flex } from "@chakra-ui/react";
import React from "react";

const Pages = ({ current, changePage, total }) => {
  return (
    <Flex py='8' gap='6' justifyContent='center'>
      <Button disabled={current === 0} onClick={() => changePage(current - 1)}>
        PREV
      </Button>
      <Button disabled={true}>{current}</Button>
      <Button
        disabled={current === Math.floor(total / 9)}
        onClick={() => changePage(current + 1)}
      >
        NEXT
      </Button>
    </Flex>
  );
};

export default Pages;
