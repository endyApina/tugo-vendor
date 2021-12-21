
import React, { useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';

import {
  NativeBaseProvider,
  Box,
  Text,
  Pressable,
  Heading,
  IconButton,
  Image, 
  Icon,
  HStack,
  VStack,
  Spacer,
} from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { appRoutes } from '../../../config';

export default function VendorList({navigation}) {
  const [mode, setMode] = useState('Basic');

  return (
    <NativeBaseProvider>
      <Box bg="white" flex="1" safeAreaTop>
        <Heading p="4" pb="3" size="lg">
          Stations
        </Heading>
        <Basic navigation={navigation} />
      </Box>
    </NativeBaseProvider>
  );
}

function Basic({navigation}) {
  const data = [
    {
      id: 'ad7zcbea-c1b1-46c2-aed5-3ad53abb28ba',
      stationName: 'Endy Khan',
      contactNumber: '08165219905',
      stationAddress: '11, Appropriately enhance market street. Ibadan',
      avatarUrl:
        'https://picsum.photos/id/237/200/300',
    },
    {
      id: 'be7acbei-c1b1-46c2-aed5-3ad53abb28ba',
      stationName: 'Apinageri Khan',
      contactNumber: '08165224905',
      stationAddress: '12, Appropriately enhance market street. Ibadan',
      avatarUrl:
        'https://picsum.photos/id/231/200/300',
    },
    {
      id: 'cd7acbsa-c1b1-46c2-aed5-3ad53abb28ba',
      stationName: 'Onome Khan',
      contactNumber: '08165029905',
      stationAddress: '13, Appropriately enhance market street. Ibadan',
      avatarUrl:
        'https://picsum.photos/id/232/200/300',
    },
    {
      id: 'gd7aceea-c1b1-46c2-aed5-3ad53abb28ba',
      stationName: 'Aganga Khan',
      contactNumber: '08165299905',
      stationAddress: '15, Appropriately enhance market street. Ibadan',
      avatarUrl:
        'https://picsum.photos/id/233/200/300',
    },
    {
      id: 'bd7agbea-c1b1-46c2-aed5-3ad53abb28ba',
      stationName: 'Lorry Khan',
      contactNumber: '08165239905',
      stationAddress: '21, Appropriately enhance market street. Ibadan',
      avatarUrl:
        'https://picsum.photos/id/234/200/300',
    },
  ];

  const [listData, setListData] = useState(data);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = (rowKey) => {
    console.log('This row opened', rowKey);
  };

  const renderItem = ({ item, index }) => (
    <Box>
        <Pressable 
            onPress={() => {
                navigation.navigate(appRoutes.vendorDetails)
            }} 
            bg="white"
        >
            <Box
            pl="4"
            pr="5"
            py="2"
            >
            <HStack alignItems="center" space={3}>
                <Image
                    source={{ uri: item.avatarUrl }}
                    alt="Alternate Text"
                    size="xl"
                />
                <VStack>
                <Text color="coolGray.800"  _dark={{ color: 'warmGray.50' }}  bold>
                    {item.stationName}
                </Text>
                <Text color="coolGray.600" _dark={{ color: 'warmGray.200' }}>{item.stationAddress}</Text>
                <Text color="coolGray.600" _dark={{ color: 'warmGray.200' }}>{item.contactNumber}</Text>
                </VStack>
                <Spacer />
            </HStack>
            </Box>
        </Pressable>
    </Box>
  );

  const renderHiddenItem = (data, rowMap) => (
    <HStack flex="1" pl="2">
      <Pressable
        w="70"
        ml="auto"
        cursor="pointer"
        bg="coolGray.200"
        justifyContent="center"
        onPress={() => closeRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}>
        <VStack alignItems="center" space={2}>
          <Icon
            as={<Entypo name="dots-three-horizontal" />}
            size="xs"
            color="coolGray.800"
          />
          <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
            More
          </Text>
        </VStack>
      </Pressable>
      <Pressable
        w="70"
        cursor="pointer"
        bg="red.500"
        justifyContent="center"
        onPress={() => deleteRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}>
        <VStack alignItems="center" space={2}>
          <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
          <Text color="white" fontSize="xs" fontWeight="medium">
            Delete
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );

  return (
    <Box bg="white" safeArea flex="1">
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-130}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
      />
    </Box>
  );
}
