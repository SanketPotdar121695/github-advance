import { Box, Button, Flex, Grid, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GitCard from './GitCard';
import Pages from './Pages';

const getData = (page = 1, param = 'all') => {
  return axios.get(
    `https://api.github.com/search/repositories?q=stars:%3E1+language:${param}&page=${page}&per_page=9&sort=star&order=desc`
  );
};

const GitStar = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [param, setParam] = useState('all');
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
      <Flex
        mt='6'
        justifyContent='center'
        gap={{ base: '6', sm: '8', md: '12', lg: '16' }}
        borderRadius='50%'
      >
        <Button
          bg={param === 'all' ? 'red.400' : 'teal.400'}
          onClick={() => handleClick('all')}
        >
          All
        </Button>
        <Button
          bg={param === 'html' ? 'red.400' : 'teal.400'}
          onClick={() => handleClick('html')}
        >
          HTML
        </Button>
        <Button
          bg={param === 'css' ? 'red.400' : 'teal.400'}
          onClick={() => handleClick('css')}
        >
          CSS
        </Button>
        <Button
          bg={param === 'javascript' ? 'red.400' : 'teal.400'}
          onClick={() => handleClick('javascript')}
        >
          JavaScript
        </Button>
      </Flex>
      {loading && <Heading mt='6'>Loading...</Heading>}
      {!loading && (
        <Grid
          justifyContent='center'
          px='12'
          gap='12'
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)'
          }}
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

      {!loading && <Pages current={page} changePage={setPage} total={total} />}
    </Box>
  );
};

export default GitStar;
