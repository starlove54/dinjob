import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { useRouter } from "expo-router";
import styles from './welcome.style';
import { icons, SIZES } from '../../../constants';

// Available job types
const jobTypes = ["Full-time", "Part-time", "Contractor"];

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState('Full-time'); // Default job type

  return (
    <View>

      {/* User information */}
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Dinesh</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>

      {/* Job search */}
      <View style={styles.searchContainer}>
        {/* Search input */}
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput} // need to load custom fonts
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder="What are you looking for?"
          />
        </View>

        {/* Search button */}
        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      {/* Job type tabs */}
      <View style={styles.tabsContainer}>
        {/* Flatlist for rendering tabs */}
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item); // Set active job type on tab press
                router.push(`/search/${item}`); // Navigate to search page with selected job type
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal // Set the flatlist direction to horizontal
        />
      </View>

    </View>
  )
}

export default Welcome;
