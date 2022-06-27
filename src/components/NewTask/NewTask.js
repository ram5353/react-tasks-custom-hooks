import { useState } from 'react';
import useHttp from '../../hooks/use-http';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const {isLoading, error, sendReuqest: sendTaskRequest} = useHttp();

  const enterTaskHandler = async (taskText) => {
    const createTask = (taskData) => {
      const generatedId = taskData.name;
      const createdTask = { id: generatedId, text: taskText };
  
      props.onAddTask(createdTask);
    }
    
    sendTaskRequest({
      url: 'https://tasks123-85876-default-rtdb.firebaseio.com/tasks.json',
      method: 'POST',
      header: {
        'Content-type': 'application/json'
      },
      body: {text: taskText}
    }, createTask)
    
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
