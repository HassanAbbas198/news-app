import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '../../constants/Colors';

import Modal from 'react-native-modal';
import Card from './Card';

const CustomModal = (props) => {
  const [isVisible, setIsVisible] = useState(true);

  const selectedNews = useSelector((state) => state.news.selectedNews);

  return (
    <Modal isVisible={isVisible} animationIn="zoomIn" animationOut="zoomOut">
      <Card styles={styles.modal}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedNews.imageUrl }} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text>{selectedNews.category}</Text>
          <Text style={styles.title}>{selectedNews.title}</Text>
          <Text>{selectedNews.description}</Text>
        </View>
      </Card>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modal: {
    height: '65%',

    alignItems: 'center',
    overflow: 'hidden',
  },

  imageContainer: {
    width: '100%',
    height: '50%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  textContainer: {
    alignItems: 'flex-start',
    height: '23%',
    padding: 11,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 6,
  },
});

// import React, { useState } from 'react';
// import {
//   Alert,
//   Modal,
//   StyleSheet,
//   Text,
//   TouchableHighlight,
//   View,
// } from 'react-native';

// const CustomModal = (props) => {
//   const [modalVisible, setModalVisible] = useState(false);

//   console.log(props);
//   return (
//     <View style={styles.centeredView}>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={props.show}
//         onRequestClose={() => {
//           Alert.alert('Modal has been closed.');
//         }}>
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalText}>Hello World!</Text>

//             <TouchableHighlight
//               style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
//               onPress={() => {
//                 setModalVisible(false);
//               }}>
//               <Text style={styles.textStyle}>Close</Text>
//             </TouchableHighlight>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   openButton: {
//     backgroundColor: '#F194FF',
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//   },
// });

// export default CustomModal;
