import React, {useState, useEffect} from 'react';
import { View, ScrollView, Text, TextInput, Dimensions } from 'react-native';
import {Feather} from '@expo/vector-icons'
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage'
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';

function TeacherList(){

    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState(''); 
    const [time, setTime] = useState(''); 


    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response => {
            if(response){
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                })


                setFavorites(favoritedTeachersIds);
            }
        });
    }
    useEffect(() => {
      loadFavorites();
    }, [])


    function handleToggleFiltersVisible() {
        setIsFilterVisible(!isFilterVisible);
    }
    async function handleFilterSubmit(){
        loadFavorites();
        setIsFilterVisible(false);

        const response = await api.get('classes', {
            params:{
                subject,
                week_day,
                time,
            }
        });
      setTeachers(response.data);
    
    }
    return(
        <View style={styles.container}>
             <PageHeader
              title='Proffys Disponíveis'
              headerRight= {(
                <BorderlessButton onPress={handleToggleFiltersVisible}>
                    <Feather name="filter" size={20} color="#FFF"/>
                </BorderlessButton>
              )} 
             >
                 { isFilterVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="Qual a matéria?" 
                            placeholderTextColor="#c1bccc"
                        />
                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                            <Text style={styles.label}>Dia da semana</Text>
                            <TextInput
                                style={styles.input}
                                value={week_day}
                            onChangeText={text => setWeekDay(text)}
                                placeholder="Qual o dia?"
                                    placeholderTextColor="#c1bccc"

                            />
                            </View>
                            <View style={styles.inputBlock}>
                            <Text style={styles.label}>Horário</Text>
                            <TextInput
                                style={styles.input}
                                value={time}
                                onChangeText={text => setTime(text)}
                                placeholder="Qual o horário?" 
                                placeholderTextColor="#c1bccc"

                            />
                                </View>
                        </View>
                        <RectButton onPress={handleFilterSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                        
                    </View>
                 )}
             </PageHeader>
            <ScrollView 
            style={styles.teacherList}

            contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom:260,
            }}
            >
                {teachers.map((teacher: Teacher )=> {
                    return (
                    <TeacherItem 
                    key={teacher.id} 
                    teacher={teacher}
                    favorited={favorites.includes(teacher.id)}
                    />
                    )
                } )}
              
     


            </ScrollView>
       
             
        </View>
        );

}

export default TeacherList;