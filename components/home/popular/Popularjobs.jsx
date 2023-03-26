import { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hook/useFetch";

const Popularjobs = () => {
  // useRouter hook to access the navigation object
  const router = useRouter();

  // useFetch hook to fetch data from the API
  const { data, isLoading, error } = useFetch('search', {
    query: 'React developer',
    num_pages: 1
  });

  // state variable to keep track of the selected job
  const [selectedJob, setSelectedJob] = useState();

  // function to handle the card press event
  const handleCardPress = (item) => {
    // navigate to job details screen with the selected job id as a parameter
    router.push(`/job-details/${item.job_id}`);
    // update the selected job state variable
    setSelectedJob(item.job_id);
  };

  return (
    <View style={styles.container}>
      {/* Header section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      {/* Popular job cards section */}
      <View style={styles.cardsContainer}>
        {isLoading ? ( // show activity indicator when data is loading
          <ActivityIndicator size='large' colors={COLORS.primary} />
        ) : error ? ( // show error message when there is an error
          <Text>Something went wrong</Text>
        ) : ( // show the flatlist of popular job cards when data is loaded successfully
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal // make the list horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;