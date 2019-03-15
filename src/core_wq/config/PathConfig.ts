export default class PathConfig extends Laya.Script {
    public static AppUrl: string = "https://general.vuggame.com/api/"; //正式服地址
    public static RES_URL: string = "images/";
    public static HEAD_PATH: string = PathConfig.RES_URL + "headImg/";
    public static BONE_PATH: string = PathConfig.RES_URL + "boneAnim/{0}.sk";
    public static BONE_MONSTER_PATH: string = PathConfig.RES_URL + "boneAnim/enemy/{0}.sk";
    public static SOUND_PATH: string = "musics/{0}.mp3";
}