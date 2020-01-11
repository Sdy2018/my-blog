<template>
	<div class="home">
		<el-container style="height:100vh;">
			<el-aside width="200px">
				<el-menu :default-active="$route.path" router class="el-menu-vertical">
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>导航</span>
						</template>
						<el-menu-item-group>
							<template slot="title">文章</template>
							<el-menu-item index="/articles/lists">文章列表</el-menu-item>
							<el-menu-item index="/articles/detail">编辑文章</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</el-menu>
			</el-aside>

			<router-view :key="$route.path">

			</router-view>

		</el-container>
	</div>
</template>

<script>

export default {
}
</script>

<style lang="less">
.home {
	width: 100%;
	.el-menu-vertical {
		height: 100vh;
	}
}
</style>
