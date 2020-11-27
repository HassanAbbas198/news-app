import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableHighlight,
  Alert,
} from 'react-native';

import useHttp from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, show, clearError] = useHttp(axios);

    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={show}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{error ? error : 'null'}</Text>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={clearError}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <WrappedComponent {...props} />
      </View>
      // <React.Fragment>
      // 	<Modal show={show} onHide={clearError}>
      // 		<Modal.Header closeButton>
      // 			<Modal.Title>Oops!</Modal.Title>
      // 		</Modal.Header>
      // 		<Modal.Body>{error ? error : null}</Modal.Body>
      // 		<Modal.Footer>
      // 			<Button variant="danger" onClick={clearError}>
      // 				Close
      // 			</Button>
      // 		</Modal.Footer>
      // 	</Modal>
      // 	<WrappedComponent {...props} />
      // </React.Fragment>
    );
  };
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default withErrorHandler;
