import { View, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ImageCropPicker, { ImageOrVideo } from "react-native-image-crop-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { URI } from "@/redux/URI";
import { loadUser } from "@/redux/actions/userAction";
import MainContainer from "@/components/container/MainContainer";
import StyledText from "@/components/Text/StyledText";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import StyledTextInput from "@/components/TextInput/StyledTextInput";

type Props = {
  navigation: any;
};

const EditProfile = ({ navigation }: Props) => {
  const { user, token } = useSelector((state: any) => state.user);
  const [avatar, setAvatar] = useState(user?.avatar?.url);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: user.name,
    userName: user?.userName,
    bio: user?.bio,
  });
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  const handleSubmitHandler = async () => {
    if (userData.name.length !== 0 && userData.userName.length !== 0) {
      await axios
        .put(
          `${URI}/update-profile`,
          {
            name: userData.name,
            userName: userData.userName,
            bio: userData.bio,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res: any) => {
          loadUser()(dispatch);
        });
    }
  };

  const ImageUpload = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.8,
      includeBase64: true,
    }).then((image: ImageOrVideo | null) => {
      if (image) {
        // setImage('data:image/jpeg;base64,' + image.data);
        axios
          .put(
            `${URI}/update-avatar`,
            {
              // @ts-ignore
              avatar: "data:image/jpeg;base64," + image?.data,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res: any) => {
            loadUser()(dispatch);
          });
      }
    });
  };

  return (
    <MainContainer>
      <View className="flex-row items-center justify-between p-3 py-8 px-5">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="close"
              size={20}
              color={activeColors.tint}
            />
          </TouchableOpacity>
          <StyledText className=" left-4 ">Edit Profile</StyledText>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: activeColors.accent,
            borderColor: activeColors.accent,
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 5,
            paddingVertical: 2,
          }}
          onPress={handleSubmitHandler}
        >
          <StyledText
            style={{
              color: activeColors.accentGray,
            }}
          >
            Save
          </StyledText>
        </TouchableOpacity>
      </View>
      <View className="h-[90%] items-center justify-center">
        <View className=" p-3  h-max  " style={{}}>
          <View className="pb-10 px-4 ">
            <TouchableOpacity onPress={ImageUpload}>
              <Image
                source={{ uri: avatar }}
                width={80}
                height={80}
                borderRadius={100}
              />
            </TouchableOpacity>
          </View>
          <View className="flex-row px-4">
            <View className="w-full ">
              <View className="space-y-5">
                <StyledText className="">Name</StyledText>
                <StyledTextInput
                  value={userData.name}
                  onChangeText={(e) => setUserData({ ...userData, name: e })}
                  placeholder="Enter your name..."
                  placeholderTextColor={activeColors.grayAccent}
                  className=""
                  style={{
                    borderColor: activeColors.grayAccent,
                    borderWidth: 1,
                    borderRadius: 5,
                  }}
                />
                <StyledTextInput
                  value={userData.userName}
                  onChangeText={(e) =>
                    setUserData({ ...userData, userName: e })
                  }
                  placeholder="Enter your userName..."
                  placeholderTextColor={activeColors.grayAccent}
                  className="mb-2"
                  style={{
                    borderColor: activeColors.grayAccent,
                    borderWidth: 1,
                    borderRadius: 5,
                  }}
                />
              </View>
            </View>
          </View>
          <View className="flex-row px-4">
            <View
              className="w-full pt-8"
              style={{
                width: "100%",
              }}
            >
              <StyledText className="pb-5">Bio</StyledText>
              <StyledTextInput
                value={userData.bio}
                onChangeText={(e) => setUserData({ ...userData, bio: e })}
                placeholder="Enter your bio..."
                placeholderTextColor={activeColors.grayAccent}
                style={{
                  borderColor: activeColors.grayAccent,
                  borderWidth: 1,
                  borderRadius: 5,
                  width: "100%",
                  textAlignVertical: "top",
                }}
                multiline={true}
                numberOfLines={4}
              />
            </View>
          </View>
        </View>
      </View>
    </MainContainer>
  );
};

export default EditProfile;
