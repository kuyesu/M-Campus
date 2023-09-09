import { FlatList } from "react-native";
import NewsItem from "@/components/News/NewsItem";

const NewSection = ({ data }: any) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <NewsItem {...item} />}
          keyExtractor={({ id }) => id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
              paddingLeft: 25,
              paddingTop: 25
          }}
    />
  );
};

export default NewSection;
