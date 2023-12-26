import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  Button,
  SafeAreaView,
} from "react-native";
import useFirebaseData from "./useFirebaseData";
import Ionicons from "react-native-vector-icons/Ionicons";

const Home = () => {
  const { data, searchQuery, handleSearch } = useFirebaseData("final", 50);

  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const toggleFilterModal = () => {
    setFilterModalVisible(!isFilterModalVisible);
  };

  const applyFilters = () => {
    toggleFilterModal();
  };

  const sortData = (field) => {
    const sortedData = [...data].sort((a, b) => {
      const fieldValueA = a[field];
      const fieldValueB = b[field];

      // Ensure both values are defined
      if (fieldValueA === undefined || fieldValueB === undefined) {
        return 0;
      }

      // Compare the values in descending order
      if (fieldValueA < fieldValueB) {
        return 1;
      } else if (fieldValueA > fieldValueB) {
        return -1;
      } else {
        return 0;
      }
    });

    return sortedData;
  };

  const renderListItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.itemName}>{item.Name}</Text>
      <View style={styles.rowContainer}>
        <View style={styles.rowItem}>
          <Ionicons name="baseball" size={16} color="#3498db" />
          <Text style={styles.itemDetail}>Hits: {item.Hits}</Text>
        </View>
        <View style={styles.rowItem}>
          <Ionicons name="ios-people" size={16} color="#2ecc71" />
          <Text style={styles.itemDetail}>Runs: {item.Runs}</Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.rowItem}>
          <Ionicons name="ios-football" size={20} color="#f39c12" />
          <Text style={styles.itemDetail}>RBIs: {item.Runs_Batted_In}</Text>
        </View>
        <View style={styles.rowItem}>
          <Ionicons name="ios-speedometer" size={20} color="#d35400" />
          <Text style={styles.itemDetail}>
            Stolen Bases: {item.Stolen_Bases}
          </Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.rowItem}>
          <Ionicons name="ios-walk" size={20} color="#27ae60" />
          <Text style={styles.itemDetail}>
            Base On Balls: {item.Base_On_Balls}
          </Text>
        </View>
        <View style={styles.rowItem}>
          <Ionicons name="ios-close-circle" size={20} color="#c0392b" />
          <Text style={styles.itemDetail}>Strikeouts: {item.Strikeouts}</Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.rowItem}>
          <Ionicons name="ios-baseball" size={20} color="#3498db" />
          <Text style={styles.itemDetail}>
            Batting Average: {item.Batting_Average}
          </Text>
        </View>
        <View style={styles.rowItem}>
          <Ionicons name="ios-podium" size={20} color="#f39c12" />
          <Text style={styles.itemDetail}>
             Percentage: {item.On_Base_Percentage}
          </Text>
        </View>
      </View>

      {/* Add more fields based on your design */}
    </View>
  );

  const filteredData = data.filter((item) =>
    item.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedAndFilteredData = selectedFilter
    ? sortData(selectedFilter)
    : filteredData;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Name..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity onPress={toggleFilterModal}>
          <Ionicons
            name="options-outline"
            size={24}
            color="#3498db"
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={sortedAndFilteredData}
        keyExtractor={(item) => item.Rank.toString()}
        renderItem={renderListItem}
        numColumns={1}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={toggleFilterModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around", width:"80%" }}
            >
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  selectedFilter === "Hits" && styles.selectedFilter,
                ]}
                onPress={() => setSelectedFilter("Hits")}
              >
                <Text style={styles.filterButtonText}>Sort by Hits</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  selectedFilter === "Runs" && styles.selectedFilter,
                ]}
                onPress={() => setSelectedFilter("Runs")}
              >
                <Text style={styles.filterButtonText}>Sort by Runs</Text>
              </TouchableOpacity>
            </View>
            {/* Add more filter options based on your design */}
            <View style={styles.modalButtonContainer}>
              <Button 
                title="Close"
                onPress={toggleFilterModal}
                color="#e74c3c"
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f4f4",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "white", // Polished appearance
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    marginRight: 8,
    borderWidth:1,
    borderRadius:10
  },
  filterIcon: {
    marginLeft: 8,
   backgroundColor:"lightgrey",
   padding:10,
   borderRadius:10
  },
  listItem: {
    flex: 1,
    padding: 16,
    marginBottom: 8,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 2,
    shadowColor: "red",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    margin: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemDetail: {
    fontSize: 14,
    marginLeft: 4,
  },
  // Styles for Filter Modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    elevation: 5,
  },
  filterButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: "center",
  },
  selectedFilter: {
    backgroundColor: "#2980b9", // Different color for selected filter
  },
  filterButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Home;
