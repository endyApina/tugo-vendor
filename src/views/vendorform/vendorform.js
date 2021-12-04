import * as React from "react"
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Icon,
  Button,
  NativeBaseProvider,
  ScrollView,
  useToast
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'react-native-image-picker';
import { appRoutes } from "../../../config";

export const AddVendor = ({navigation}) => {
    const [response, setResponse] = React.useState(null);
    const toast = useToast()
    return (
        <ScrollView>
            <Box safeArea p="2" py="8" px="8" w="100%" maxW="410">
            <Heading
                size="lg"
                fontWeight="600"
                color="coolGray.800"
                _dark={{
                color: "warmGray.50",
                }}
            >
                New Gas Station
            </Heading>
            <Heading
                mt="1"
                _dark={{
                color: "warmGray.200",
                }}
                color="coolGray.600"
                fontWeight="medium"
                size="xs"
            >
                Fill in details to add new gas station
            </Heading>

            <VStack space={3} mt="5">
                <FormControl>
                <FormControl.Label>Name</FormControl.Label>
                <Input 
                    placeholder="Enter name of gas station"
                />
                </FormControl>
                <FormControl>
                <FormControl.Label>Manager's Name</FormControl.Label>
                <Input 
                    placeholder="Enter gas station manager's name"
                />
                </FormControl>
                <FormControl>
                <FormControl.Label>Manager's Phone Number</FormControl.Label>
                <Input 
                    placeholder="Enter station manager's phone number"
                    keyboardType="numeric"
                />
                </FormControl>
                <FormControl>
                <FormControl.Label>Address</FormControl.Label>
                <Input 
                    placeholder="Enter gas station's address"
                />
                </FormControl>
                <Button
                    leftIcon={<Icon as={Ionicons} 
                    name="cloud-download-outline" 
                    size="sm" />}
                    onPress={() => {
                        ImagePicker.launchImageLibrary({
                            maxHeight: 200,
                            maxWidth: 200,
                            selectionLimit: 0,
                            mediaType: 'photo',
                            includeBase64: false,
                        }, setResponse)
                    }}
                >
                    Upload Station Image
                </Button>
                <Button 
                    mt="2" 
                    colorScheme="indigo"
                    onPress={() => {
                        toast.show({
                            title: "Station Added",
                            status: "success",
                            description: "Redirecting to gas station list...",
                        })
                        setTimeout(() => {
                            navigation.navigate(appRoutes.vendorList)
                        }, 2000);
                    }}
                >
                    Add Station
                </Button>
            </VStack>
            </Box>
        </ScrollView>
    )
}

export default ({navigation}) => {
  return (
    <NativeBaseProvider>
        <AddVendor navigation={navigation} />
    </NativeBaseProvider>
  )
}

//source https://github.com/react-native-image-picker/react-native-image-picker/blob/main/example/src/App.tsx