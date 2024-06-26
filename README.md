<div align="center"> 本项目不再更新，因此不会继续审核或解决任何issues。 </div>

<div align="center">

# Hamibot 词达人脚本

<a href="https://hamibot.com/" target="_blank"><img src="https://github.com/gaobobo/Hamibot-XueXitongAuto/blob/main/Doc/Resource/WorkWithHamibot.png" alt="Power by Hamibot" width='200'></img></a> 

</div>

## 关于此脚本

此脚本可以自动完成自主练习。（非考试）

只适用于Hamibot支持的平台（安卓系统）。

**此代码仅供学习用途使用，这也是为什么我们开源并要求使用此代码的程序开源。**

**关于本代码的使用，详见文末`分发许可`。**

## 如何使用

- 首先，前往[Hamibot](https://hamibot.com/)注册账户。并在安卓设备上安装Hamibot。（[下载Hamibot](https://hamibot.com/download)）

- 打开设备上的Hamibot，并在控制台内[添加机器人](https://hamibot.com/dashboard/robots)。此时，在设备上输入配对码，完成配对。

- 然后，在开发内[创建脚本](https://hamibot.com/dashboard/scripts/create)，在下方上传文件。文件可在本仓库的[Github Release](https://github.com/gaobobo/Hamibot-CidarenAuto/releases/latest/)下载。

> 你也可以在[Github Release](https://github.com/gaobobo/Hamibot-CidarenAuto/releases/latest/)中找到一键导入的按钮。

- 之后，确认设备上的Hamibot的无障碍服务开启。

> 建议你同时打开Hamibot的悬浮窗权限，这会在运行过程中显示调试台和运行信息。

- 前往词达人的选项页面（注意，必须是拥有四个选项的单选题页面。其他题型程序无法作答，会自动停止。）

- 最后，前往[开发](https://hamibot.com/dashboard/scripts/console)运行脚本。

- 欲想停止脚本，除了可以在[机器人](https://hamibot.com/dashboard/robots)、[开发](https://hamibot.com/dashboard/scripts/console)内停止外，还可以直接关闭Hamibot。

## 已知问题与反馈

任何的已知问题均可通过Issues提交反馈。

目前的已知问题也罗列在Issues中。

## 帮助完善此项目

欲想共同完善此项目，可通过下面的步骤进行开发。

- 在VS Code中，添加`Hamibot开发助手`扩展

- 克隆本仓库

- 在仓库根目录内新建文件`hamibot.config.json`填入以下字段：

```json
{
    "fileMark": {
        "scriptFile": "src/main.js",
        "configFile": "src/config.json"
    },
    "name": "对应Hamibot开发内的脚本名称",
    "scriptId": "开发-选择对应的脚本-更多-设置-复制ID",
    "executeRobot": {
    "_id": "机器人-对应机器人-更多-复制ID",
    "name": "机器人名称"
    }
}

```

> **注意：此文件内的id为敏感信息。本仓库的Git已经设置提交时忽略此文件。**
> 
> **在克隆其他非本仓库的其他副本时，务必检查`.gitignore`文件是否存在并忽略了文件`hamibot.config.json`。**
>
> **如使用其他的版本管理工具，请自行设置文件忽略或文件保护。**

- 欲想调试或运行，使用`Ctrl+Shift+P`，搜索`Hamibot`。选择相应操作即可。

## 分发许可

本代码使用`GNU AFFERO GENERAL PUBLIC LICENSE`分发许可。

这意味着：

- 定义网络传播为分发的一种

- 分发时必须提供源代码

- 必须以相同的许可证分发

使用`GNU AFFERO GENERAL PUBLIC LICENSE`分发许可，其目的是让每个人都能平等的访问、使用本代码。

这意味着：

- 本代码可以用于商业用途

- 每个人都有分发和修改代码的权力

- 可以私下使用和修改
