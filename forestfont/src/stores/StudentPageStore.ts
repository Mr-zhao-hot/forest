import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import { StudentLogin, StudentRegister} from "@/api/LoginApi.ts";
import {RoleSelectAll} from "@/api/RoleApi.ts";
import {message} from 'ant-design-vue';
import router from "@/router";



export const StudentPageStore = defineStore('StudentPageStore', () => {
        // 身份下拉框
        interface OptionItem {
            label: string;
            value: number;
        }


        // 登录接口注册
        interface Login {
            phone: string;
            password: string;
            remember: boolean;
        }

        // 注册接口注册
        interface Register {

            email: string;
            password: string;
            phone: string;
            username: string,
            roleIds:number|undefined
        }

        // 登录接口
        const Login = reactive<Login>({
            phone: '14740178387',
            password: 'admin123',
            remember: true,
        });
        // 注册下拉菜单选择、
        const size = ref('middle');
        const options = ref<OptionItem[]>([]); // 明确指定类型
        // 注册接口
        const Register = reactive<Register>({
            email: "",
            password: "",
            phone: "",
            username: "",
            roleIds:undefined
        })


        // 获得全部角色名单
        const selectRoleAll = async () => {
            RoleSelectAll().then(res => {
                // console.log('角色接口响应:', res.data) // 调试日志
                // console.log(options.value)
                // 安全数据映射（带类型校验）
                options.value = (res.data?.data || []).map((item: { roleName: string; roleId: number }) => ({
                    label: item.roleName,
                    value: item.roleId, // 绑定角色ID
                }));
                console.log(options.value)
            })
        }



        // 请求登录接口
        const LoginForm = async () => {
            StudentLogin({
                phone: Login.phone,
                password: Login.password
            }).then((res) => {
                console.log(res);
                if (res.data.code == 200000) {
                    // 存入token
                    localStorage.setItem("accessToken", res.data.data.token);
                    router.push("/pageMain")
                    message.success(`欢迎登录: ${res.data.data.username}，${res.data.message}`);

                } else {
                    // 错误消息
                    message.error("登录错误"+res.data.message);
                }

            }).catch((err) => {
                message.error("服务器异常请联系管理员", err);
            })
        }

        // 请求注册接口
        const RegisterForm = async () => {
            StudentRegister({
                phone: Register.phone,
                password: Register.password,
                email: Register.email,
                username: Register.username,
                roleIds:Register.roleIds,
            }).then((res) => {
                console.log(res)
                if (res.data.code == 200000) {
                    location.reload()
                    message.success(res.data.data);
                }else {
                    message.error(res.data.message);
                }
            }).catch((err) => {
                console.log(err)
            })
        }

        // 退出登录
        const layout = () =>{
            localStorage.removeItem("accessToken");
        }

        const onFinish = (values: any) => {
            console.log('Success:', values);
        };

        const onFinishFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo);
        };

        return {
            Login,
            onFinish,
            onFinishFailed,
            Register,
            LoginForm,
            RegisterForm,
            size,
            options,
            selectRoleAll,
            layout

        }
    }
);
