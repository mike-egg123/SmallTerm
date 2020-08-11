<template>
    <div class="welcome">
        <div class="night">
            <div class="shooting_star"></div>
            <div class="shooting_star"></div>
            <div class="shooting_star"></div>
            <div class="shooting_star"></div>
            <div class="shooting_star"></div>
            <div class="shooting_star"></div>
            <div class="shooting_star"></div>
            <div class="shooting_star"></div>
            <div class="shooting_star"></div>
            <div class="shooting_star"></div>
            <div class="shooting_star"></div>
            <div class="shooting_star"></div>
            <div class="shooting_star"></div>
            <div class="shooting_star"></div>
            <div class="shooting_star"></div>
            <div class="shooting_star"></div>
            <div class="shooting_star"></div>
            <div class="shooting_star"></div>
            <div class="shooting_star"></div>
            <div class="shooting_star"></div>
        </div>
        <el-row style="height: 380px; overflow: hidden">
            <div class="content-wrap">
                <div class="content-card">
                    <div class="diamond-wrap">
                        <div class="diamond">
                            <div class="diamond-side side--top">
                                <div class="diamond-sharp"></div>
                                <div class="diamond-sharp"></div>
                                <div class="diamond-sharp"></div>
                                <div class="diamond-sharp"></div>
                                <div class="diamond-sharp"></div>
                                <div class="diamond-sharp"></div>
                                <div class="diamond-sharp"></div>
                                <div class="diamond-sharp"></div>
                                <div class="diamond-sharp"></div>
                            </div>
                            <div class="diamond-side side--bottom">
                                <div class="diamond-sharp">
                                    <div class="diamond-sharp--color"></div>
                                </div>
                                <div class="diamond-sharp">
                                    <div class="diamond-sharp--color"></div>
                                </div>
                                <div class="diamond-sharp">
                                    <div class="diamond-sharp--color"></div>
                                </div>
                                <div class="diamond-sharp">
                                    <div class="diamond-sharp--color"></div>
                                </div>
                                <div class="diamond-sharp">
                                    <div class="diamond-sharp--color"></div>
                                </div>
                                <div class="diamond-sharp">
                                    <div class="diamond-sharp--color"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-row>
        <el-row class="welcomewords" >
            欢迎使用金刚石文档！
        </el-row>
        <br>
        <div style="height: 80px"></div>
        <el-row :gutter="20" style="width: 100%" >
            <router-link to="/login">
                <el-col :span="1" :offset="9"><el-button round style="margin-right: 50px;">登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button></el-col>
            </router-link>
             <router-link to="/register">
                <el-col :span="3" :offset="3"> <el-button type="primary" round>注&nbsp;&nbsp;&nbsp;&nbsp;册</el-button></el-col>
             </router-link>
        </el-row>
    </div>
</template>
<script>
  export default {
    name: "Welcome"
  }
</script>

<style scoped>
    .content-wrap {
        height: 500px;
        display: flex;
        justify-content: center;
        align-items: center;
        /*padding-top: 70px;*/
        /*padding-bottom: 160px;*/
    }
    .content-card {
        width: 400px;
        height: 200px;
        /*background: #FFFFFF;*/
        border-radius: 5px;
        display: flex;
        position: absolute;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .content-wrap .content-card .diamond-wrap {
        animation: diamond-shiny 1s infinite alternate;
    }
    @keyframes diamond-shiny {
        from {
            filter: drop-shadow(0 0 20px #FFF) drop-shadow(0 0 5px #BEDEFF);
        }
        to {
            filter: drop-shadow(0 0 50px #FFF) drop-shadow(0 0 20px #BEDEFF);
        }
    }
    .content-wrap .content-card .diamond {
        width: 200px;
        height: 175px;
        clip-path: polygon(0 50px, 35px 0, 165px 0, 200px 50px, 100px 175px);
        transform: scale(0.6);
    }
    .content-wrap .content-card .diamond .diamond-side {
        width: 200px;
    }
    .content-wrap .content-card .diamond .diamond-side.side--top {
        height: 50px;
        display: flex;
        animation: diamond--top 1s linear infinite;
    }
    @keyframes diamond--top {
        from {
            margin-left: 0;
        }
        to {
            margin-left: -133.3333333333px;
        }
    }
    .content-wrap .content-card .diamond .diamond-side.side--top .diamond-sharp {
        width: 66.6666666667px;
        height: 50px;
        background: #FFF;
        flex-shrink: 0;
        animation: diamond--top-sharp 0.5s linear infinite alternate;
    }
    @keyframes diamond--top-sharp {
        from {
            background: #FFF;
        }
        to {
            background: #C2E0FF;
        }
    }
    .content-wrap .content-card .diamond .diamond-side.side--top .diamond-sharp + .diamond-sharp {
        margin-left: -33.3333333333px;
    }
    .content-wrap .content-card .diamond .diamond-side.side--top .diamond-sharp:nth-child(even) {
        clip-path: polygon(0 0, 100% 0, 50% 100%);
        animation: diamond--top-sharp-even 0.5s linear infinite alternate;
    }
    @keyframes diamond--top-sharp-even {
        from {
            background: #AAD3FE;
        }
        to {
            background: #FFF;
        }
    }
    .content-wrap .content-card .diamond .diamond-side.side--bottom {
        height: 125px;
        background: #C2E0FF;
        display: flex;
    }
    .content-wrap .content-card .diamond .diamond-side.side--bottom .diamond-sharp {
        width: 200px;
        height: 125px;
        flex-shrink: 0;
        position: absolute;
    }
    .content-wrap .content-card .diamond .diamond-side.side--bottom .diamond-sharp:nth-child(1) {
        animation: diamond--bottom-sharp-0 1s linear infinite;
    }
    @keyframes diamond--bottom-sharp-0 {
        from {
            clip-path: polygon(0% 0, 33.3333333333% 0, 50% 100%);
        }
        to {
            clip-path: polygon(-66.6666666667% 0, -33.3333333333% 0, 50% 100%);
        }
    }
    .content-wrap .content-card .diamond .diamond-side.side--bottom .diamond-sharp:nth-child(2) {
        animation: diamond--bottom-sharp-1 1s linear infinite;
    }
    @keyframes diamond--bottom-sharp-1 {
        from {
            clip-path: polygon(33.3333333333% 0, 66.6666666667% 0, 50% 100%);
        }
        to {
            clip-path: polygon(-33.3333333333% 0, 0% 0, 50% 100%);
        }
    }
    .content-wrap .content-card .diamond .diamond-side.side--bottom .diamond-sharp:nth-child(3) {
        animation: diamond--bottom-sharp-2 1s linear infinite;
    }
    @keyframes diamond--bottom-sharp-2 {
        from {
            clip-path: polygon(66.6666666667% 0, 100% 0, 50% 100%);
        }
        to {
            clip-path: polygon(0% 0, 33.3333333333% 0, 50% 100%);
        }
    }
    .content-wrap .content-card .diamond .diamond-side.side--bottom .diamond-sharp:nth-child(4) {
        animation: diamond--bottom-sharp-3 1s linear infinite;
    }
    @keyframes diamond--bottom-sharp-3 {
        from {
            clip-path: polygon(100% 0, 133.3333333333% 0, 50% 100%);
        }
        to {
            clip-path: polygon(33.3333333333% 0, 66.6666666667% 0, 50% 100%);
        }
    }
    .content-wrap .content-card .diamond .diamond-side.side--bottom .diamond-sharp:nth-child(5) {
        animation: diamond--bottom-sharp-4 1s linear infinite;
    }
    @keyframes diamond--bottom-sharp-4 {
        from {
            clip-path: polygon(133.3333333333% 0, 166.6666666667% 0, 50% 100%);
        }
        to {
            clip-path: polygon(66.6666666667% 0, 100% 0, 50% 100%);
        }
    }
    .content-wrap .content-card .diamond .diamond-side.side--bottom .diamond-sharp:nth-child(6) {
        animation: diamond--bottom-sharp-5 1s linear infinite;
    }
    @keyframes diamond--bottom-sharp-5 {
        from {
            clip-path: polygon(166.6666666667% 0, 200% 0, 50% 100%);
        }
        to {
            clip-path: polygon(100% 0, 133.3333333333% 0, 50% 100%);
        }
    }
    .content-wrap .content-card .diamond .diamond-side.side--bottom .diamond-sharp .diamond-sharp--color {
        width: 100%;
        height: 100%;
        animation: diamond--bottom-sharp 0.5s linear infinite alternate;
    }
    @keyframes diamond--bottom-sharp {
        from {
            background: #C2E0FF;
        }
        to {
            background: #AAD3FE;
        }
    }
    .content-wrap .content-card .diamond .diamond-side.side--bottom .diamond-sharp:nth-child(even) .diamond-sharp--color {
        animation: diamond--bottom-sharp-even 0.5s linear infinite alternate;
    }
    @keyframes diamond--bottom-sharp-even {
        from {
            background: #AAD3FE;
        }
        to {
            background: #C2E0FF;
        }
    }
    .content-wrap .content-card .diamond .diamond-side.side--bottom .diamond-sharp:nth-child(2) .diamond-sharp--color {
        background: #C2E0FF;
        animation: none !important;
    }
    .content-wrap .content-card .diamond .diamond-side.side--bottom .diamond-sharp:nth-child(5) .diamond-sharp--color {
        background: #AAD3FE;
        animation: none !important;
    }
    .content-wrap .content-description {
        width: 400px;
        margin-top: 160px;
        color: #FFF;
        position: absolute;
    }
    .content-wrap .content-description .description--inspiration {
        font-size: 0.8em;
    }
    .content-wrap .content-description .description--inspiration
    .description--hyperlink {
        color: #EA4C89;
        text-decoration: none;
    }
    .welcomewords{
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        font-size: 50px;
        margin-left: 50px;
    }
    .night {
        position: relative;
        width: 100%;
        height: 100%;
        -webkit-transform: rotateZ(45deg);
        transform: rotateZ(45deg);
        -webkit-animation: sky 200000ms linear infinite;
        animation: sky 200000ms linear infinite;
    }

  .shooting_star {
    position: absolute;
    left: 50%;
    top: 50%;
    height: 2px;
    background: linear-gradient(-45deg, #5f91ff, rgba(0, 0, 255, 0));
    border-radius: 999px;
    -webkit-filter: drop-shadow(0 0 6px #699bff);
    filter: drop-shadow(0 0 6px #699bff);
    -webkit-animation: tail 3000ms ease-in-out infinite, shooting 3000ms ease-in-out infinite;
    animation: tail 3000ms ease-in-out infinite, shooting 3000ms ease-in-out infinite;
  }
  .shooting_star::before, .shooting_star::after {
    content: '';
    position: absolute;
    top: calc(50% - 1px);
    right: 0;
    height: 2px;
    background: linear-gradient(-45deg, rgba(0, 0, 255, 0), #5f91ff, rgba(0, 0, 255, 0));
    -webkit-transform: translateX(50%) rotateZ(45deg);
    transform: translateX(50%) rotateZ(45deg);
    border-radius: 100%;
    -webkit-animation: shining 3000ms ease-in-out infinite;
    animation: shining 3000ms ease-in-out infinite;
  }
  .shooting_star::after {
    -webkit-transform: translateX(50%) rotateZ(-45deg);
    transform: translateX(50%) rotateZ(-45deg);
  }
  .shooting_star:nth-child(1) {
    top: calc(50% - 185px);
    left: calc(50% - 150px);
    -webkit-animation-delay: 8971ms;
    animation-delay: 8971ms;
  }
  .shooting_star:nth-child(1)::before, .shooting_star:nth-child(1)::after, .shooting_star:nth-child(1)::after {
    -webkit-animation-delay: 8971ms;
    animation-delay: 8971ms;
  }
  .shooting_star:nth-child(2) {
    top: calc(50% - 50px);
    left: calc(50% - 179px);
    -webkit-animation-delay: 9256ms;
    animation-delay: 9256ms;
  }
  .shooting_star:nth-child(2)::before, .shooting_star:nth-child(2)::after, .shooting_star:nth-child(2)::after {
    -webkit-animation-delay: 9256ms;
    animation-delay: 9256ms;
  }
  .shooting_star:nth-child(3) {
    top: calc(50% - -146px);
    left: calc(50% - 135px);
    -webkit-animation-delay: 8700ms;
    animation-delay: 8700ms;
  }
  .shooting_star:nth-child(3)::before, .shooting_star:nth-child(3)::after, .shooting_star:nth-child(3)::after {
    -webkit-animation-delay: 8700ms;
    animation-delay: 8700ms;
  }
  .shooting_star:nth-child(4) {
    top: calc(50% - -77px);
    left: calc(50% - 157px);
    -webkit-animation-delay: 3147ms;
    animation-delay: 3147ms;
  }
  .shooting_star:nth-child(4)::before, .shooting_star:nth-child(4)::after, .shooting_star:nth-child(4)::after {
    -webkit-animation-delay: 3147ms;
    animation-delay: 3147ms;
  }
  .shooting_star:nth-child(5) {
    top: calc(50% - -183px);
    left: calc(50% - 8px);
    -webkit-animation-delay: 6588ms;
    animation-delay: 6588ms;
  }
  .shooting_star:nth-child(5)::before, .shooting_star:nth-child(5)::after, .shooting_star:nth-child(5)::after {
    -webkit-animation-delay: 6588ms;
    animation-delay: 6588ms;
  }
  .shooting_star:nth-child(6) {
    top: calc(50% - -29px);
    left: calc(50% - 195px);
    -webkit-animation-delay: 8009ms;
    animation-delay: 8009ms;
  }
  .shooting_star:nth-child(6)::before, .shooting_star:nth-child(6)::after, .shooting_star:nth-child(6)::after {
    -webkit-animation-delay: 8009ms;
    animation-delay: 8009ms;
  }
  .shooting_star:nth-child(7) {
    top: calc(50% - 95px);
    left: calc(50% - 69px);
    -webkit-animation-delay: 5420ms;
    animation-delay: 5420ms;
  }
  .shooting_star:nth-child(7)::before, .shooting_star:nth-child(7)::after, .shooting_star:nth-child(7)::after {
    -webkit-animation-delay: 5420ms;
    animation-delay: 5420ms;
  }
  .shooting_star:nth-child(8) {
    top: calc(50% - -59px);
    left: calc(50% - 70px);
    -webkit-animation-delay: 9378ms;
    animation-delay: 9378ms;
  }
  .shooting_star:nth-child(8)::before, .shooting_star:nth-child(8)::after, .shooting_star:nth-child(8)::after {
    -webkit-animation-delay: 9378ms;
    animation-delay: 9378ms;
  }
  .shooting_star:nth-child(9) {
    top: calc(50% - 76px);
    left: calc(50% - 238px);
    -webkit-animation-delay: 2845ms;
    animation-delay: 2845ms;
  }
  .shooting_star:nth-child(9)::before, .shooting_star:nth-child(9)::after, .shooting_star:nth-child(9)::after {
    -webkit-animation-delay: 2845ms;
    animation-delay: 2845ms;
  }
  .shooting_star:nth-child(10) {
    top: calc(50% - 83px);
    left: calc(50% - 6px);
    -webkit-animation-delay: 5205ms;
    animation-delay: 5205ms;
  }
  .shooting_star:nth-child(10)::before, .shooting_star:nth-child(10)::after, .shooting_star:nth-child(10)::after {
    -webkit-animation-delay: 5205ms;
    animation-delay: 5205ms;
  }
  .shooting_star:nth-child(11) {
    top: calc(50% - -137px);
    left: calc(50% - 267px);
    -webkit-animation-delay: 808ms;
    animation-delay: 808ms;
  }
  .shooting_star:nth-child(11)::before, .shooting_star:nth-child(11)::after, .shooting_star:nth-child(11)::after {
    -webkit-animation-delay: 808ms;
    animation-delay: 808ms;
  }
  .shooting_star:nth-child(12) {
    top: calc(50% - 12px);
    left: calc(50% - 8px);
    -webkit-animation-delay: 2406ms;
    animation-delay: 2406ms;
  }
  .shooting_star:nth-child(12)::before, .shooting_star:nth-child(12)::after, .shooting_star:nth-child(12)::after {
    -webkit-animation-delay: 2406ms;
    animation-delay: 2406ms;
  }
  .shooting_star:nth-child(13) {
    top: calc(50% - 148px);
    left: calc(50% - 47px);
    -webkit-animation-delay: 7566ms;
    animation-delay: 7566ms;
  }
  .shooting_star:nth-child(13)::before, .shooting_star:nth-child(13)::after, .shooting_star:nth-child(13)::after {
    -webkit-animation-delay: 7566ms;
    animation-delay: 7566ms;
  }
  .shooting_star:nth-child(14) {
    top: calc(50% - -28px);
    left: calc(50% - 75px);
    -webkit-animation-delay: 7634ms;
    animation-delay: 7634ms;
  }
  .shooting_star:nth-child(14)::before, .shooting_star:nth-child(14)::after, .shooting_star:nth-child(14)::after {
    -webkit-animation-delay: 7634ms;
    animation-delay: 7634ms;
  }
  .shooting_star:nth-child(15) {
    top: calc(50% - -37px);
    left: calc(50% - 203px);
    -webkit-animation-delay: 7743ms;
    animation-delay: 7743ms;
  }
  .shooting_star:nth-child(15)::before, .shooting_star:nth-child(15)::after, .shooting_star:nth-child(15)::after {
    -webkit-animation-delay: 7743ms;
    animation-delay: 7743ms;
  }
  .shooting_star:nth-child(16) {
    top: calc(50% - 41px);
    left: calc(50% - 256px);
    -webkit-animation-delay: 2888ms;
    animation-delay: 2888ms;
  }
  .shooting_star:nth-child(16)::before, .shooting_star:nth-child(16)::after, .shooting_star:nth-child(16)::after {
    -webkit-animation-delay: 2888ms;
    animation-delay: 2888ms;
  }
  .shooting_star:nth-child(17) {
    top: calc(50% - -35px);
    left: calc(50% - 121px);
    -webkit-animation-delay: 5864ms;
    animation-delay: 5864ms;
  }
  .shooting_star:nth-child(17)::before, .shooting_star:nth-child(17)::after, .shooting_star:nth-child(17)::after {
    -webkit-animation-delay: 5864ms;
    animation-delay: 5864ms;
  }
  .shooting_star:nth-child(18) {
    top: calc(50% - 73px);
    left: calc(50% - 225px);
    -webkit-animation-delay: 7883ms;
    animation-delay: 7883ms;
  }
  .shooting_star:nth-child(18)::before, .shooting_star:nth-child(18)::after, .shooting_star:nth-child(18)::after {
    -webkit-animation-delay: 7883ms;
    animation-delay: 7883ms;
  }
  .shooting_star:nth-child(19) {
    top: calc(50% - -69px);
    left: calc(50% - 47px);
    -webkit-animation-delay: 3339ms;
    animation-delay: 3339ms;
  }
  .shooting_star:nth-child(19)::before, .shooting_star:nth-child(19)::after, .shooting_star:nth-child(19)::after {
    -webkit-animation-delay: 3339ms;
    animation-delay: 3339ms;
  }
  .shooting_star:nth-child(20) {
    top: calc(50% - 162px);
    left: calc(50% - 129px);
    -webkit-animation-delay: 7963ms;
    animation-delay: 7963ms;
  }
  .shooting_star:nth-child(20)::before, .shooting_star:nth-child(20)::after, .shooting_star:nth-child(20)::after {
    -webkit-animation-delay: 7963ms;
    animation-delay: 7963ms;
  }

  @-webkit-keyframes tail {
    0% {
      width: 0;
    }
    30% {
      width: 100px;
    }
    100% {
      width: 0;
    }
  }

  @keyframes tail {
    0% {
      width: 0;
    }
    30% {
      width: 100px;
    }
    100% {
      width: 0;
    }
  }
  @-webkit-keyframes shining {
    0% {
      width: 0;
    }
    50% {
      width: 30px;
    }
    100% {
      width: 0;
    }
  }
  @keyframes shining {
    0% {
      width: 0;
    }
    50% {
      width: 30px;
    }
    100% {
      width: 0;
    }
  }
  @-webkit-keyframes shooting {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    100% {
      -webkit-transform: translateX(300px);
      transform: translateX(300px);
    }
  }
  @keyframes shooting {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    100% {
      -webkit-transform: translateX(300px);
      transform: translateX(300px);
    }
  }
  @-webkit-keyframes sky {
    0% {
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }
    100% {
      -webkit-transform: rotate(405deg);
      transform: rotate(405deg);
    }
  }
  @keyframes sky {
    0% {
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }
    100% {
      -webkit-transform: rotate(405deg);
      transform: rotate(405deg);
    }
  }
  .welcome{
    overflow-y: visible;
  }
</style>
