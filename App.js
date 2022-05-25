
import { StyleSheet, Text, View, ScrollView, FlatList, Image,ActivityIndicator } from 'react-native';
import axios from 'axios';
import React,{ useState,useEffect } from 'react';
export default function App() {

  const fetchData = async(pNUMBER) => {
    setLoading(true);
    const baseURL = "http://api.themoviedb.org/3/discover/movie?api_key=acea91d2bff1c53e6604e4985b6989e2&page="
 await axios.get(baseURL + `${pNUMBER}`).then((response) => {
      setLoading(false)
      setData(data.concat(response.data.results))    
    }
    )
     
  } 
  React.useEffect(() => {
    LoadData()
  
    return () => {
      
    }
  }, [])

  const LoadData =  () => {
      fetchData(number)
      setNumber(number+1)
  }
  const [data, setData] = useState([])
  const [number, setNumber] = useState(1)
  const [isLoading, setLoading] = useState(false);

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    console.log(layoutMeasurement.height)
    console.log(contentOffset.y)
    console.log(contentSize.height)
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>List of Movies</Text>
      </View>
      <View style={styles.body}>
        <ScrollView onScroll={({nativeEvent}) => {
      if (isCloseToBottom(nativeEvent)) {
        LoadData()
      }
    }}
    scrollEventThrottle={400}>
        {data.map((e, i) => (
            
            <View key={i} style={{
              borderRadius: 8, borderColor: "#574B44", borderWidth: 2
            }}>
           
              <Text style={{ fontSize: 18, color: "#570C08" }}>Title :{e.title}</Text>
              <Text>OverView :{e.overview}</Text>
              <Image source={{
                uri: "https://image.tmdb.org/t/p/original" + e.poster_path
              }} style={{
                width: 200,
                height: 200, borderRadius: 10

              }}
              ></Image>
              <Text style={{ fontSize: 16, color: "#FFFFFF", fontStyle: 'italic' }}>Release_date :{e.release_date}
              </Text>
              { isLoading?
   <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color={"#ff0000"}/>
  </View>:null
  
  }
            </View>))
            
          }
        </ScrollView>
        
      </View>
      <View style={styles.footer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }, header: {
    flex: 1,
    backgroundColor: "#e9e9e9",
    alignItems: 'center',
    justifyContent: 'center'
  }, footer: {
    flex: 1,
    backgroundColor: "#e9e9e9"
  }, body: {
    flex: 6,
    backgroundColor: "#425654",
  },
});
