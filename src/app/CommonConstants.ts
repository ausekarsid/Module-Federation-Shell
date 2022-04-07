
import { environment } from '../environments/environment';

export class CommonConstants {

   env = environment;

   // public static authmanageapiUrl = environment.authManageUrl;
   // public static videoUploadUrl = environment.videoUploadUrl;

   //public static url_toreadJson: string = "https://firebasestorage.googleapis.com/v0/b/excellent-math-265006.appspot.com/o/100066.json?alt=media&token=45697f4f-a50b-4c06-8076-6e4d6e6998dc"
  
  // Video upload APIs URLs
   public static getRedirectDetails:string = '/video/redirectDetails';  
   public static _VideoMetadataUrl: string ='/video/getMetadataAttributes';
   public static url_toreadFile: string =  '/video/storeinCosmos';
   public static updateCustomBrandUrl: string =  '/video/updateBrand';
   public static validateVideoFormatURL: string =  '/video/validateformat';
   public static getMeasureDetails: string =  '/video/getMeasureDetails/';
   public static getCountryAdDetails: string =  '/video/getcountryadDetails';
   public static getFilteredClientList: string =   '/video/getFilteredClientListLinkAI';
   public static getClientBrandList: string =   '/video/getClientBrandList';
   public static getBrandAssosiatedData: string =   '/video/brandAssosiatedDetails';
   public static eventPipelineUrl=  '/video/getEventStatusDetails';
   public static extractExcelReport =  '/video/getLibraryExcelReport';
   public static extractInternalExcelReport =  '/video/getInternalLibraryExcel';
   public static extractAllAdsExcelReport = '/video/extractAllAdsExcelReport'
   public static excelReportAccess =  '/video/excelReportAccess';
   public static statusPageAccess = '/video/statusPageAccess';
   public static analyzerChartdata =  '/video/getAnalyzerchartsData';
   public static eventRetriggerUrl: string =  '/video/manualRetrigger';
   public static deleteVideoUrl: string =  '/video/delete';
   public static _BrandVideosurl: string =  '/video/library';
   public static _FiltersLibraryurl: string =  '/video/filterlibrary';
   public static getScoreFilterData: string =  '/video/applyScoreFilter';
   public static pptDownloadUrl : string =  '/video/execSummary/getPPTReport';
   public static checkMarket : string = '/video/checkEmotionSnapshot'
   public static comparePptDownloadUrl : string = '/video/compare/getPPTReport';
   public static compareStudyIdStatusUrl : string = '/video/getPredictionsStatuses'
   public static getExecutiveSummaryUrl: string =  '/video/getExecutiveSummary';
   public static getAdByClientCountryUrl: string =  '/video/getAdByClientCountry';
   public static getKPIListUrl: string =  '/video/getDistinctKPI';
   public static countryListUrl: string =  '/video/getCountrysByClient/';
   public static videoLimitcheckurl: string =  '/video/uploadVideoLimitCheck';
   public static analyserToggleCheck: string =  '/video/uploadAnalyserCheck';
   public static updateOwnedOrCompetitor: string = '/video/updateOwnedorCompetitor';
   public static compareAnalyzerDataUrl: string = '/video/compare/getAnalyzerData';
   
   //Auth Manage Urls
   public static clientListUrl: string = '/auth/getClientsData';
   public static userInfoUrl: string = '/auth/getUserInfo';

   public static craeteNewUserUrl: string = 'auth/insertNewUser';
   public static getUserListUrl: string = '/auth/getUserList';
   public static deleteUserUrl : string= '/auth/deleteUser';
   public static updateAssignedDashboard : string ='/auth/updateAssignedDashboard';

   public static exportAdminExcel = '/auth/exportAdminExcel';

    //Admin Urls
   public static getCreateContainerData: string = '/admin/getCreateContainerData';
   public static createDashboardContainer: string = '/admin/createDashboardContainer';
   public static getDashContainerConfigList: string = '/admin/getDashContainerConfigList';
   public static deleteDashboardContainer: string = '/admin/deleteDashboardContainer';
   public static getUserDashboardList:string = '/admin/getUserDashboardList';
   public static editDashboardContainer:string = '/admin/editDashboardContainer';
   public static getDashboardContainerConfig:string = '/admin/getDashboardConfiguration';
   
   public static checkvideoLimitUrl = '/admin/uploadVideoLimitCheck';
   public static getConfiguredSnapshotData:string = '/admin/getConfiguredSnapshotData';
   public static getConfiguredSnapshotDataLite:string = '/admin/getLinkAILiteConfiguredSnapshotData';

   public static compareDataUrl: string =  '/admin/compareData';
  
   public static getContainersVideoLimit: string = '/admin/getContainersVideoLimit';
   public static setContainerVideoLimit: string = '/admin/setContainerVideoLimit';
 
}
