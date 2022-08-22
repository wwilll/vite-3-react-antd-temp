/**
 * 注册数据model
 */
 import useGlobalModel from './useGlobalModel';
 import useTestModel from './useTestModel';
 
 const models = {
   useGlobalModel,
   useTestModel,
 };
 
 export default models
 
 export type modelsType = keyof typeof models