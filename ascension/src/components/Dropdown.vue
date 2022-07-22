<template>
    <div class="menu-item" @click="isOpen = !isOpen">
        <a href="#">{{ title }}</a>
        <svg class="ml-1 w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>    
    </div>

    <transition name="fade" appear>
        <div class="sub-menu z-50" v-if="isOpen">
            <div v-for="(item, i) in items" :key="i" class="menu-item text-white">
                <a :href="item.link">{{ item.title }}</a>
            </div>
        </div>
    </transition>
</template>


<script>
export default {
    name: 'AccountDropdown',
    props: ['title', 'items'],
    data () {
        return {
            isOpen: false
        }
    }
}

</script>


<style>
    nav .menu-item .sub-menu {
        background-color: rgba(0, 0, 0, 0.600);
        top: calc(100% + 18px);
        left: -50%;
        transform: translateX(50%);
        width: max-content;
        margin-right: 10%;
    }

    nav .menu-item {
        position: static;
    }

    nav .sub-menu {
        position: absolute;
        width: max-content;
        background-color: rgba(0, 0, 0, 0.478);
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: all .2s ease-out;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

</style>