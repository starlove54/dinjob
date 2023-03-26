import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import styles from "./nearbyjobs.style";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from "../../../hook/useFetch";

const Nearbyjobs = () => {
  // Get the router object from Expo's useRouter hook
  const router = useRouter();

  // Use the useFetch hook to fetch nearby jobs from the API
  const { data, isLoading, error } = useFetch('search', {
    query: 'React developer',
    num_pages: 1,
  });

  return (
    <View style={styles.container}>
      {/* Render the header section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      {/* Render the job cards section */}
      <View style={styles.cardsContainer}>
        {/* If the data is still being fetched, show a loading spinner */}
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : 
        // If there was an error while fetching the data, show an error message
        error ? (
          <Text>Something went wrong</Text>
        ) : (
          // Otherwise, render the job cards using the data fetched from the API
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job?.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
