import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { LEVELS } from '../../../models/levels.enum';
import { Task } from '../../../models/task.class';

const taskSchema = Yup.object().shape(
    {
        name: Yup.string()
                .min(6, 'Taskname too short')
                .required('Task name is required'),
        description: Yup.string()
                .min(6, 'Description too short')
                .required('Description is required'),
        level: Yup.string()
                .required('Level is required')
    }
);

const TaskFormik = ({add, length}) => {

    const initialTask = {
        name: '',
        description: '',
        level: LEVELS.NORMAL
    }

    return (
        <div>
            <h3>EJERCICIOS SESIONES 13, 14 Y 15. FORMULARIO TAREAS</h3>

            <Formik
                initialValues = { initialTask }
                validationSchema = { taskSchema }
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 1000));
                    //alert(JSON.stringify(values, null, 2));
                    const newTask = new Task(
                        values.name,
                        values.description,
                        false,
                        values.level
                    );
                    add(newTask);
                }}
            >

                {({ values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur }) => (
                        <Form>
                            <Field id="name" type="text" name="name" placeholder="Task Name" />

                            {
                                errors.name && touched.name && 
                                (
                                    <ErrorMessage name="name" component='div'></ErrorMessage>
                                )
                            }

                            <Field id="description" type="text" name="description" placeholder="Task Description" />

                            {
                                errors.description && touched.description && 
                                (
                                    <ErrorMessage name="description" component='div'></ErrorMessage>
                                )
                            }

                            <Field id="level" name="level" as="select">
                                <option value={LEVELS.NORMAL}>Normal</option>
                                <option value={LEVELS.URGENT}>Urgent</option>
                                <option value={LEVELS.BLOCKING}>Blocking</option>
                            </Field>

                            {
                                errors.level && touched.level &&
                                (
                                    <ErrorMessage name="level" component='div'></ErrorMessage>
                                )
                            }

                            <button type="submit">{length > 0 ? 'Add New Task' : 'Create your First Task'}</button>
                            {isSubmitting ? (<p>Creating your task</p>): null}
                        </Form>
                )}
        
            </Formik>

        </div>
    );
};


TaskFormik.propTypes = {
    add: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired
};

export default TaskFormik;
