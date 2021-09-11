import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Dimensions, Image, ImageBackground, Animated } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import COLORS from '../../constants/colors';
import hotels from '../../helpers/fake-hotel-data';

const { width } = Dimensions.get('window')
const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const categories = ['All', 'Popular', 'Top Rated', 'Featured', 'Luxury', 'new']
  const CategoriesList = () => {
    return categories.map((category, index) => {
      const selectedCategoryStyle = selectedCategory === index && styles.activeCategory;
      return (
        <TouchableOpacity key={index} activeOpacity={0.8} style={index !== categories.length - 1 && styles.categoryButton} onPress={() => setSelectedCategory(index)}>
          <View>
            <Text style={{ ...styles.categoryText, ...selectedCategoryStyle }}>{category}</Text>
            {selectedCategory === index && <View style={styles.activeCategoryLine} />}
          </View>
        </TouchableOpacity>
      )
    })
  }
  const HotelCard = ({ hotel, index }) => {
    const inputRange = [(index - 1) * (width *0.5), index * (width *0.5), (index + 1) * (width *0.5)];
    const opacity = scrollX.interpolate({ inputRange, outputRange: [0.5, 0, 0.5] });

    return (<View style={styles.hotel}>
      <Animated.View  style={{...styles.overlayHotelCardImage, opacity}} />
      <Image source={hotel.image} style={styles.hotelCardImage} />
      <View style={styles.hotelCardPriceContainer}>
        <Text style={styles.hotelCardPrice}>{hotel.price}</Text>
      </View>
    </View>)
  }
  return (
    <View style={styles.homeContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Find your hotel</Text>
          <View style={styles.headerCountryContaier}>
            <Text style={styles.headerText}>in </Text>
            <Text style={styles.headerCountryText}>Paris</Text>
          </View>
        </View>
        <View style={styles.profileIconContainer}>
          <Icon name="person-outline" size={30} color="black" style={styles.profileIcon} />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <Icon name="search" size={30} style={{ marginLeft: 10 }} />
        <TextInput placeholder="Search" style={styles.searchInput} />
      </View>
      <View style={styles.categoryContainerBox}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryContainer} >
          <CategoriesList />
        </ScrollView>
      </View>
      <View style={styles.suggestedHotels}>
        <Animated.FlatList
          keyExtractor={(item) => item.id}
          data={hotels}
          horizontal
          renderItem={({ item, index }) => <HotelCard hotel={item} index={index} />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingRight:width*0.5}}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
          scrollEventThrottle={16}
          snapToInterval={width *0.5}
        />
      </View>
    </View>
  )
}
export default HomeScreen;
const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 23,
    padding: 10
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 30
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  headerCountryText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.primary
  },
  headerCountryContaier: {
    display: 'flex',
    flexDirection: 'row'
  },
  searchContainer: {
    backgroundColor: COLORS.light,
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 5,

  },
  profileIcon: {
    padding: 10
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 20,
    width: '100%'
  },
  categoryContainerBox: {
    height: 60
  },
  categoryContainer: {
    marginTop: 15,
  },
  categoryText: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  categoryButton: {
    marginRight: 25
  },
  activeCategory: {
    color: COLORS.primary,
    position: 'relative',
  },
  activeCategoryLine: {
    height: 3,
    backgroundColor: COLORS.primary
  },
  suggestedHotels: {
    flex: 1,
    height: 20,
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    height: 42,
  },
  hotel: {
    width: width * 0.5,
    height: 200,
    marginRight: 15,
    position: 'relative',
    overflow: 'hidden',

  },
  hotelCardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15
  },
  hotelCardPriceContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    height: 60,
    width: 80,
    padding: 10,
    zIndex: 1,
    borderTopRightRadius: 15,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  },
  hotelCardPrice: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
  overlayHotelCardImage: {
    position:'absolute',
    width: width * 0.5,
    height: 200,
    backgroundColor: '#FFF',
    zIndex:1
  }
});
