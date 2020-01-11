<!--分页-->
<template>
	<div class="page_container" v-if="totalPage>1">
		<div class="page_box">
			<span v-for="(item,index) in showPageBtn" :class="{active:currentPage===item}"  @click="turn(item)" :key="index" v-text="item">
				
			</span>
		</div>
	</div>
</template>

<script>
export default {
  name: "MyPagination",
  props: {
    currentPage: {
      //当前页
      type: Number,
      default: 1
    },
    pageSize: {
      //每页显示条数
      type: Number,
      default: 10
    },
    totalCount: {
      //总条数
      type: Number,
      required: true
    },
    small: {
      type: Boolean,
      default: false
    },
    all: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.totalCount / this.pageSize);
    },
    showPageBtn() {
      let pageNum = this.totalPage
      let  index = this.currentPage
      let  arr = []
      if (pageNum <= 9) {
        for (let i = 1; i <= pageNum; i++) {
          arr.push(i);
        }
        return arr;
      }
      if (index < 5) return [1, 2, 3, 4, 5, 6, 7, "...", pageNum];
      if (index >= pageNum - 1)
        return [
          1,
          2,
          "...",
          pageNum - 5,
          pageNum - 4,
          pageNum - 3,
          pageNum - 2,
          pageNum - 1,
          pageNum
        ];
      if (index === pageNum - 2)
        return [
          1,
          2,
          "...",
          pageNum - 5,
          pageNum - 4,
          pageNum - 3,
          pageNum - 2,
          pageNum - 1,
          pageNum
        ];
      return [
        1,
        "...",
        index - 2,
        index - 1,
        index,
        index + 1,
        index + 2,
        "...",
        pageNum
      ];
    }
  },
  methods: {
    //翻页，显示条数变化
    turn(page) {
		this.$emit('pageChange',page)
    }
  }
};
</script>

<style scoped lang="scss">
@media screen and (min-width:500px) and (max-width: 900px) {
	.aricle_details_container {
		.aritcle_content {
			font-size: 12px;
		}
	}
}
@media screen and (min-width:500px) and (max-width: 700px) {
	.page_container {
		.page_box{
			span{
				font-size: 20px !important;
			}
		}
	}
}
@media screen and (max-width: 500px) {
	.page_container {
		.page_box{
			span{
				font-size: 35px !important;
			}
		}
	}
}
@media screen and (min-width:700px) and (max-width: 1100px) {
	.page_container {
		.page_box{
			span{
				font-size: 15px !important;
			}
		}
	}
}
	.page_container{
		display: flex;
		justify-content: center;
		margin-top: 10px;
		.page_box{
			span {
				font-size: 10px;
				padding: 1px 4px;
				border: 1px solid #e6e6e6;
			}
		}
		.active{
			background: #353535;
			color: #fff;
		}
	}
</style>
