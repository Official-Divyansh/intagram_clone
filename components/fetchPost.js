import { View, Text, Button, TouchableOpacity , Image, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { searchPost } from '../utils/fetch';
import { client } from '../client';
import Ionicons from 'react-native-vector-icons/Ionicons'


export default function New({ postData,navigation, refreshing ,Email }) {
   useEffect(()=>{
       console.log(Email, "kh")
   },[])
    return (
        <View>
            <Feed postData={postData} navigation={navigation} refreshing={refreshing} Email={Email}  />
            </View>
           
            )
}


function RenderFeeds({ feeds, onAddToWatch, onRemoveFromWatch,nav, Email }) {
    return (
        <>
            {feeds.map((data, index) => (
                <TouchableOpacity key={index} activeOpacity={0.94} style={{ marginBottom: 20 }}  >
                    <TouchableOpacity onPress={() => nav.navigate('PostDetail', {
                        name: data.title,
                        Email: Email
                    })}>

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 8, justifyContent: 'space-between' }}>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}

                            >
                                <Ionicons
                                    size={35}
                                    color='white'
                                    name="person-circle-outline" />
                                <Text style={{ color: 'white', marginLeft: 10 }} >{data.title}</Text>
                            </View>

                            <Ionicons name="ellipsis-vertical-outline"
                                color="white"
                                size={20}
                            />
                        </View>
                    </TouchableOpacity>
                    <RestaurentImage image={data.image}/>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>


                            <Ionicons

                                onPress={() =>
                                    data.watchlist
                                        ? onRemoveFromWatch(data.id)
                                        : onAddToWatch(data.id)
                                }
                                size={30}
                                name={data.watchlist ? 'heart' : 'heart-outline'}
                                color={data.watchlist ? 'red' : 'white'}
                            />


                            <Ionicons name='chatbubble-outline' color="white" size={25} style={{ marginLeft: 15 }} />
                            <Ionicons name='paper-plane-outline' color="white" size={25} style={{ marginLeft: 15 }} />
                        </View>
                        <Ionicons name='bookmark-outline' color="white" size={25} />
                    </View>
                    <Text style={{ color: "white" }} >{data.caption}</Text>
                    <Text style={{ color: "white" }} >Liked by dark emerade and others 56</Text>
                </TouchableOpacity>
            ))}
           
        </>
    );
}




const RestaurentImage = (props)=>(
    <>
    <Image
    source={{
        uri: props.image
    }}
style={{width: "100%", aspectRatio: 1, alignContent: 'center'}}
    />
    </>
)

function Feed({ navigation, refreshing , Email}) {
    const [feeds, setFeeds] = React.useState([]);

    React.useEffect(() => {
        let query = searchPost()
        const data = client.fetch(query)
            .then((data) => {
                // console.log(data)
                setFeeds(data)
            })
        // setFeeds(postData)


    }, [refreshing]);

    const handleAddToWatch = (id) => {
        // implement updating feeds, for example making an ajax request and getting new data
        setFeeds((feeds) =>
            feeds.map((feed) => ({
                ...feed,
                watchlist: feed.id == id ? true : feed.watchlist,
            }))
        );
    };
    const handleRemoveFromWatch = (id) => {
        // implement updating feeds, for example making an ajax request and getting new data
        setFeeds(feeds =>
            feeds.map((feed) => ({
                ...feed,
                watchlist: feed.id == id ? false : feed.watchlist,
            }))
        );
    };

    return (
        <>
        <RenderFeeds
            nav={navigation}
            feeds={feeds}
            onAddToWatch={handleAddToWatch}
            onRemoveFromWatch={handleRemoveFromWatch}
            Email={Email}
            />
                
            </>

    );
}
 {/* ReactDOM.render(<Feed/>, document.getElementById('root')) */}