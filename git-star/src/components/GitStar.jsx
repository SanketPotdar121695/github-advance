import { Box, Button, Flex, Grid, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import GitCard from "./GitCard";
import Pages from "./Pages";

const getData = (page = 1, param = "all") => {
  return axios.get(
    `https://api.github.com/search/repositories?q=stars:%3E1+language:${param}&page=${page}&per_page=9&sort=star&order=desc`
  );
};

const GitStar = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [param, setParam] = useState("all");
  const [loading, setLoading] = useState(false);

  const handleClick = (param) => {
    setLoading(true);
    getData(page, param).then((response) => {
      setData(response.data.items);
      setTotal(response.data.total_count);
      setLoading(false);
    });
    setParam(param);
  };

  useEffect(() => {
    setLoading(true);
    getData(page, param).then((response) => {
      setData(response.data.items);
      setTotal(response.data.total_count);
      setLoading(false);
    });
  }, [page, param]);

  return (
    <Box>
      <Heading color='orange.400' textDecor='underline' size='2xl' mt='4'>
        Git Repos
      </Heading>
      <Flex mt='6' justifyContent='center' gap='16' borderRadius='50%'>
        <Button
          bg='teal.400'
          _active={{ bg: "red.400" }}
          onClick={() => handleClick("all")}
        >
          All
        </Button>
        <Button onClick={() => handleClick("html")}>HTML</Button>
        <Button onClick={() => handleClick("css")}>CSS</Button>
        <Button onClick={() => handleClick("javascript")}>JavaScript</Button>
      </Flex>
      {loading && <Heading>Loading...</Heading>}
      {!loading && (
        <Grid
          justifyContent='center'
          px='12'
          gap='12'
          templateColumns='repeat(3, 1fr)'
        >
          {data.map((repo) => (
            <GitCard
              key={repo.id}
              {...repo}
              page={page}
              setPage={setPage}
              total={total}
            />
          ))}
        </Grid>
      )}
      {data.length && (
        <Pages current={page} changePage={setPage} total={total} />
      )}
    </Box>
  );
};

export default GitStar;
