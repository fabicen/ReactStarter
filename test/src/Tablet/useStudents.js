import useSWR, { mutate } from 'swr';

/**
 * @typedef {Object} Student
 * @property {number} studentId - Unique identifier for the student
 * @property {string} name - Name of the student
 * @property {string} dateOfBirth - Date of birth of the student
 * @property {string} major - Major of the student
 */

const url = 'http://localhost:5000/students';

/**
 * Sends a PUT request to update a student record.
 * 
 * @param {number} id - The ID of the student to update
 * @param {Student} data - The student data to update
 * @returns {Promise<Student>} - The updated student data
 */
async function updateRequest(id, data) {
  const response = await fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

/**
 * Sends a POST request to add a new student record.
 * 
 * @param {Student} data - The student data to add
 * @returns {Promise<Student>} - The added student data
 */
async function addRequest(data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

/**
 * Sends a DELETE request to remove a student record.
 * 
 * @param {number} id - The ID of the student to delete
 * @returns {Promise<void>}
 */
async function deleteRequest(id) {
  const response = await fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response.json();
}

/**
 * Sends a GET request to retrieve all student records.
 * 
 * @returns {Promise<Student[]>} - An array of student records
 */
async function getRequest() {
  const response = await fetch(url);
  return response.json();
}

/**
 * Custom hook to manage student data.
 * 
 * @returns {{
 *   data: Student[],
 *   isValidating: boolean,
 *   addRow: (data: Student) => Promise<void>,
 *   updateRow: (id: number, data: Student) => Promise<void>,
 *   deleteRow: (id: number) => Promise<void>
 * }}
 */
export default function useStudents() {
  const { data, isValidating } = useSWR(url, getRequest);

  /**
   * Updates a student record and mutates the SWR cache.
   * 
   * @param {number} id - The ID of the student to update
   * @param {Student} postData - The updated student data
   */
  const updateRow = async (id, postData) => {
    await updateRequest(id, postData);
    mutate(url);
  };

  /**
   * Deletes a student record and mutates the SWR cache.
   * 
   * @param {number} id - The ID of the student to delete
   */
  const deleteRow = async (id) => {
    await deleteRequest(id);
    mutate(url);
  };

  /**
   * Adds a new student record and mutates the SWR cache.
   * 
   * @param {Student} postData - The student data to add
   */
  const addRow = async (postData) => {
    await addRequest(postData);
    mutate(url);
  };

  return {
    data: data ?? [],
    isValidating,
    addRow,
    updateRow,
    deleteRow
  };
}
