<template>
     <el-form-item label="户籍所在地" prop="censusLand" style="padding-left:57px">
 <el-cascader
  v-model="ruleForm.censusLand"
  style="width:180px;padding-left:7px;width:270px"
  placeholder="请选择省市区"
  :options="cascaderData1"
  @expand-change="censusLandChange"
  :props="{
  value: 'id',
  label: 'name',
  children: 'cities'
  }"
 ></el-cascader>
 </el-form-item>
</template>

<script>
export default {
    data (){
        return {
        ruleForm: {
        censusLand // 双向绑定
        },
        cascaderData1: [], // 户籍省 一级菜单
        }
    },
    methods:{
    // 户籍所在地-选中后下一级
    censusLandChange(val) {
        this.getCensusLand(val);
    },
        },
    // 户籍所在地
    getCensusLand(val) {
        // console.log(val);
        let idArea;
        let sizeArea;
        if (!val) {
            idArea = null;
            sizeArea = 0;
        } else if (val.length === 1) {
            idArea = val[0];
        sizeArea = val.length; // 3:一级 4:二级 6:三级
        } else if (val.length === 2) {
            idArea = val[1];
            sizeArea = val.length; // 3:一级 4:二级 6:三级
        }

        this.$get(
        "/stu/student/getAreaId",
        {
        AreaId: idArea
        },
        res => {
        // console.log("1111",res);
        if (sizeArea === 1) {
        // 点击一级 加载二级 市
        this.cascaderData1.map((value, i) => {
        if (value.id === val[0]) {
        if (!value.cities.length) {
            value.cities = res.data.map((value, i) => {
            return {
            id: value.id,
            name: value.name,
            cities: []
            };
            });
        }
        }
        });
        } else if (sizeArea === 2) {
        // 点击二级 加载三级 区
        this.cascaderData1.map((value, i) => {
        if (value.id === val[0]) {
        value.cities.map((value, i) => {
            if (value.id === val[1]) {
            if (!value.cities.length) {
            value.cities = res.data.map((value, i) => {
            return {
            id: value.id,
            name: value.name
            };
            });
            }
            }
        });
        }
        });
        }
        // console.log(this.ruleForm.censusLand);
        },
        err => {}
        );
    },
    // 户籍
    censusLand: [
    res.data.getupdate.domicileProvinceId * 1,
    res.data.getupdate.domicileCityId * 1,
    res.data.getupdate.domicileDistrictId * 1
    ],
}
    
</script>