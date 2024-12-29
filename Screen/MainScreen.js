import React, { useState, useEffect } from 'react';
import { Alert, View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import RoundButton from '../RoundButton';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const MainScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [scannedItems, setScannedItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('식품');
  
  useEffect(() => {
    if (route.params?.barcodeData) {
      setScannedItems(prevItems => [...prevItems, route.params.barcodeData]);
    }
    const unsubscribe = navigation.addListener('focus', () => {
        fetchProductDataFromFirestore();
    });

    return unsubscribe;
  }, [route.params?.barcodeData, selectedCategory, navigation]);

  const Searchbt = () => {
    navigation.navigate('Search');
  };

  const updateSelectedCategory = (newCategory) => {
    setSelectedCategory(newCategory);
    fetchProductDataFromFirestore(newCategory);
  };

  const fetchProductDataFromFirestore = async (category = selectedCategory) => {
    try {
      const currentUser = firebase.auth().currentUser;
      const db = firebase.firestore();
      const productsRef = db.collection("users").doc(currentUser.uid).collection("product").doc("cate").collection(category);

      const querySnapshot = await productsRef.get();
      const products = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        products.push({
          prnm: data.prname,
          data: data.brnum,
          deadline: data.deadline,
          docId: doc.id,
        });
      });

      setScannedItems(products);
    } catch (error) {
      console.error('Firestore에서 데이터를 가져오는 중 오류 발생:', error);
    }
  };

  const deleteItem = (docId) => {
    Alert.alert(
      '삭제',
      '정말로 삭제하시겠습니까?',
      [
        { text: '취소', onPress: () => { }, style: 'cancel' },
        {
          text: '삭제',
          onPress: async () =>{ 
            await remove(docId);
          },
            style: 'destructive', 
        },
      ],
      {
        cancelable: true,
        onDismiss: () => { },
      },
    );
  };
  
  const remove = async (docId) => {
    try {
      const currentUser = firebase.auth().currentUser;
      const db = firebase.firestore();
      const selectedCategory = '식품'; // 예시로 기본 카테고리 설정 (필요에 따라 변경)
  
      const productsRef = db
      .collection("users")
      .doc(currentUser.uid)
      .collection("product")
      .doc("cate")
      .collection(selectedCategory)
      .doc(docId);
  
      await productsRef.delete();
  
      console.log('데이터 삭제 완료');
      setScannedItems((prevItems) => prevItems.filter((item) => item.docId !== docId));
    } catch (error) {
      console.error('데이터 삭제 실패:', error);
    }
  };

  const showProductDetail = (item) => {
    navigation.navigate('ProductDetail', {
      prnm: item.prnm,
      data: item.data,
      deadline: item.deadline,
    });
  };

  return (
    <View style={Styles.container}>
      <Header onSearchPress={Searchbt} selectedCategory={selectedCategory} />
      <View style={Styles.horizontalLine} />
      <ScannedItemList scannedItems={scannedItems} onDeleteItem = {deleteItem} onPressItem={showProductDetail} />
      <RoundButton onPress={() => navigation.navigate('Scanner')} />
    </View>
  );
};

const Header = ({ onSearchPress, selectedCategory, categories, onSelectCategory }) => (
  <View style={Styles.topRow}>
    <TouchableOpacity onPress={() => onSelectCategory(category)}>
      <Text style={Styles.logo}>{selectedCategory}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onSearchPress}>
      <Image
        style={Styles.search}
        source={require('../assets/search.png')}
      />
    </TouchableOpacity>
  </View>
);

const ScannedItemList = ({ scannedItems, onDeleteItem, onPressItem }) => (
  <FlatList
    data={scannedItems}
    keyExtractor={(item, index) => item.docId}
    renderItem={({ item }) => (
      <TouchableOpacity onLongPress={() => onDeleteItem(item.docId)} onPress={() => onPressItem(item)}>
      <View style={Styles.scannedItem}>
        <View style={Styles.itemInfo}>
          <Text style={Styles.deadline}>{`${item.deadline}`}</Text>
          <Text style={Styles.prnm}>{`${item.prnm}`}</Text>
          <Text>{`${item.data}`}</Text>
        </View>
        <Image
          style={Styles.itemImage}
          source={require('../assets/post.png')}
        />
      </View>
      </TouchableOpacity>
    )}
    ItemSeparatorComponent={() => <View style={Styles.itemSeparator} />}
  />
);

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 6,
    paddingVertical: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginTop: 20,
  },
  logoContainer: {
    flex: 1,
  },
  imageContainer: {
    marginLeft: 10,
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  search: {
    width: 30,
    height: 30,
  },
  HomeText: {
    marginTop: 20,
  },
  horizontalLine: {
    height: 0.5,
    backgroundColor: '#000',
    marginVertical: 10,
  },
  scannedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: '#000'
  },
  itemInfo: {
    flex: 1,
  },
  itemImage: {
    width: 80, 
    height: 80, 
    borderRadius: 25, 
  },
  prnm: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  deadline:{
    fontSize: 12,
    textDecorationLine: 'underline',
  }
});

export default MainScreen;