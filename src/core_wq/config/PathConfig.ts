export default class PathConfig extends Laya.Script {
    public static AppUrl: string = "https://general.vuggame.com/api/"; //正式服地址
    public static AppResUrl: string = "https://miniapp.vuggame.com/sanguo_xiaoduogame_cn/v1/";
    public static RES_URL: string = PathConfig.AppResUrl + "images/";
    public static HEAD_PATH: string = PathConfig.RES_URL + "headImg/";
    public static BONE_PATH: string = PathConfig.RES_URL + "boneAnim/{0}.sk";
    public static BONE_MONSTER_PATH: string = PathConfig.RES_URL + "boneAnim/enemy/{0}.sk";
    public static SOUND_PATH: string = "musics/{0}.mp3";
}