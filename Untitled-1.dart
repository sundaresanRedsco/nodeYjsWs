

//  const schemaData = [
//     {
//         "id": "0c9ea15b3f124fbf8881b96d7f2dc77a",
//         "operation_id": "4a16cc6245b54a038151a8d644cd9e84",
//         "name": "apiResponse",
//         "record_id": "",
//         "collection_id": "",
//         "param_order": 1,
//         "data_type": "record",
//         "scope": "response",
//         "format_type": "string",
//         "format_value": "string",
//         "path": "/",
//         "created_by": "unipro@gmail.com",
//         "created_at": "2024-03-01T13:40:29",
//         "updated_by": "unipro@gmail.com",
//         "updated_at": "2024-03-01T13:40:29",
//         "description": "",
//         "parent_order": 0
//     },
//     {
//         "id": "a3c509b5b5a442e7b5ef49b7fabcaaf3",
//         "operation_id": "4a16cc6245b54a038151a8d644cd9e84",
//         "name": "status",
//         "record_id": "apiResponse",
//         "collection_id": "",
//         "param_order": 2,
//         "data_type": "string",
//         "scope": "response",
//         "format_type": "string",
//         "format_value": "string",
//         "path": "apiResponse.status",
//         "created_by": "unipro@gmail.com",
//         "created_at": "2024-03-01T13:40:29",
//         "updated_by": "unipro@gmail.com",
//         "updated_at": "2024-03-01T13:40:29",
//         "description": "",
//         "parent_order": 1
//     },
//     {
//         "id": "25015dd1ed3f493d9eff594636a8cbb0",
//         "operation_id": "4a16cc6245b54a038151a8d644cd9e84",
//         "name": "message",
//         "record_id": "apiResponse",
//         "collection_id": "",
//         "param_order": 9,
//         "data_type": "string",
//         "scope": "response",
//         "format_type": "string",
//         "format_value": "string",
//         "path": "apiResponse.message",
//         "created_by": "unipro@gmail.com",
//         "created_at": "2024-03-01T13:40:29",
//         "updated_by": "unipro@gmail.com",
//         "updated_at": "2024-03-01T13:40:29",
//         "description": "",
//         "parent_order": 1
//     }
// ];


// // Example JSON data
// const jsonData = {
//   apiResponse: {
//     status: "success",
//     data: {
//       id: 1,
//       employee_name: "Tiger Nixon",
//       employee_salary: 320800,
//       employee_age: 61,
//       profile_image: ""
//     },
//     message: "Successfully! Record has been fetched."
//   }
// };

// // Example call to extract values for "comments"
// function extractValues(jsonData, schemaData, name) {
//   console.log("jsonData:", jsonData);
//   console.log("schemaData:", schemaData);
  
//   const result = {};
  
//   for (const item of schemaData) {
//     if (item.record_id === name && item.data_type === "string") {
//       console.log("Adding string value...");
//       if (item.path === "") {
//         result[item.name] = jsonData[item.name];
//       } else {
//         result[item.name] = jsonData[name][item.path];
//       }
//     } else if (item.record_id === name && item.data_type === "number") {
//       console.log("Adding number value...");
//       if (item.path === "") {
//         result[item.name] = Number(jsonData[item.name]);
//       } else {
//         result[item.name] = Number(jsonData[name][item.path]);
//       }
//     } else if (item.record_id === name && item.data_type === "record") {
//       console.log("Adding nested record value...");
//       const nestedResult = {};
//       for (const subItem of schemaData) {
//         if (subItem.record_id === item.name && subItem.data_type === "string") {
//           nestedResult[subItem.name] = jsonData[name][item.path][subItem.path];
//         } else if (subItem.record_id === item.name && subItem.data_type === "number") {
//           nestedResult[subItem.name] = Number(jsonData[name][item.path][subItem.path]);
//         }
//       }
//       result[item.name] = nestedResult;
//     } else if (item.record_id === name && item.data_type === "collection") {
//       console.log("Adding collection value...");
//       result[item.name] = jsonData[name][item.path];
//     }
//   }
  
//   return result;
// }
// // Example usage
// const values = extractValues(jsonData, schemaData, "apiResponse");
// console.log("Extracted values:", values);

