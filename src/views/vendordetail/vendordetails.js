import * as React from 'react'; 
import { 
    NativeBaseProvider, 
    HStack,
    Heading,
    Box,
    AspectRatio,
    Image, 
    Stack, 
    Button,
    Text, 
    ScrollView, 
    Popover
} from 'native-base';
import { Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import { appRoutes } from '../../../config';

const VendorDetail = ({navigation}) => {
    return (
        <NativeBaseProvider>
            <ScrollView> 
                <Box>
                    <AspectRatio w="100%" ratio={16 / 12}>
                    <Image
                        source={{
                        uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
                        }}
                        alt="image"
                    />
                    </AspectRatio>
                </Box>
                <Stack p="7" space="3"> 
                    <Heading size="lg"> 
                        Gastab Ibadan
                    </Heading>
                    <Text>
                    Authoritatively promote enterprise-wide information after principle-centered e-tailers.
                    </Text>
                    <Stack>
                        <Box
                            width="100%"
                            p="4"
                            shadow={2}
                            borderColor={"#ff1100"}
                            _text={{
                                fontSize: "md",
                                fontWeight: "bold",
                            }}
                            >
                                <HStack> 
                                    <Ionicons name="location-outline" size={32} color="green" />
                                    <Text pt="2"> 12b, Ben Okagbue Mba Street. Lekki Phase 1. </Text>
                                </HStack>
                            </Box>
                    </Stack>
                    <Stack pb="5">
                        <Box
                            width="100%"
                            p="4"
                            shadow={1}
                            borderColor={"#ff1100"}
                            _text={{
                                fontSize: "md",
                                fontWeight: "bold",
                            }}
                            >
                                <HStack> 
                                    <Ionicons name="star" size={32} color="#FF9529" />
                                    <Ionicons name="star" size={32} color="#FF9529" />
                                    <Ionicons name="star" size={32} color="#FF9529" />
                                    <Ionicons name="star" size={32} color="#FF9529" />
                                    <Ionicons name="star-half" size={32} color="#FF9529" />
                                </HStack>
                            </Box>
                    </Stack>
                    <Stack pb="3"> 
                        <Button 
                            mt="2" 
                            colorScheme="indigo"
                            onPress={() => {
                                Linking.openURL(`tel:08165229905`)
                            }}
                        >
                            Contact Station
                        </Button>
                    </Stack>
                </Stack>
            </ScrollView>
        </NativeBaseProvider>
    )
}

export default VendorDetail