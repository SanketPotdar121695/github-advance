import { StarIcon } from '@chakra-ui/icons';
import { Flex, GridItem, Heading, Image, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeFork } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const GitCard = ({ name, language, stargazers_count, forks_count, owner }) => {
  const { avatar_url } = owner;
  return (
    <GridItem
      transition='0.5s'
      _hover={{ transform: 'scale(1.05)', cursor: 'pointer' }}
      alignSelf='normal'
      p='4'
      mt='8'
      bg='whiteAlpha.200'
      boxShadow='lg'
      borderRadius='20'
    >
      <Image w='100%' src={avatar_url} alt={name} p='4' borderRadius='28' />
      <Heading noOfLines={1} size='lg' py='2'>
        {name}
      </Heading>
      <Text fontWeight='bold' py='2'>
        {language || 'NA'}
      </Text>
      <Flex px='4' justifyContent='space-between' alignItems='center'>
        <Flex gap='4' justifyContent='center' alignItems='center'>
          <StarIcon color='yellow.600' />
          <Text>{(+stargazers_count).toLocaleString()} stars</Text>
        </Flex>
        <Flex gap='4' justifyContent='center' alignItems='center'>
          <FontAwesomeIcon icon={faCodeFork} />
          <Text>{(+forks_count).toLocaleString()} forks</Text>
        </Flex>
      </Flex>
    </GridItem>
  );
};

export default GitCard;
