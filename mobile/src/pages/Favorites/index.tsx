import React, { useState, useEffect } from "react";
import { View, ScrollView, AsyncStorage} from "react-native";

import styles from "./styles";
import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from '../../components/TeacherItem';




function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [teachers, setTeachers] = useState([]);

  function loadFavorites(){
    AsyncStorage.getItem('favorites').then(response => {
        if(response){
            const favoritedTeachers = JSON.parse(response);
            const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                return teacher.id;
            })


            setFavorites(favoritedTeachers);
        }
    });
  }
  useEffect(() => {
    loadFavorites();
  })
  return (
    <View style={styles.container}>
      <PageHeader title="Meus Proffys Favoritos" />

      <ScrollView 
            style={styles.teacherList}

            contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom:260,
            }}
            >
                {favorites.map((teacher: Teacher )=> {
                    return (
                    <TeacherItem 
                    key={teacher.id} 
                    teacher={teacher}
                    favorited
                    />
                    )
                } )}
              
     


            </ScrollView>

    </View>
  );
}

export default Favorites;
