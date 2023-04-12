<template>
    <Header :name="auth.userDisplayName"></Header>
    <div class="container mt-2">
        <div v-if="org.isOrgIdsLoading" class="d-flex justify-content-center pt-3">
            <div class="spinner-grow" role="status">
                <span class="visually-hidden">Loading...</span> 
            </div>
        </div>
        <div v-else class="row g-2">
            <div
                v-for="orgId in org.orgIds"
                :id="orgId"
                class="col-sm-12 col-md-6">
                <OrgCard
                    :id="orgId"
                    :data="org.orgData[orgId]"
                    :error="org.orgDataErrors[orgId]"
                    :isLoading="org.loadingOrgData[orgId]">
                </OrgCard>
            </div>
        </div>
    </div>
</template>
<script setup>
import Header from '@/components/Header.vue'
import OrgCard from '@/components/OrgCard.vue'
import { useOrgStore } from '@/stores/org'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue';

const auth = useAuthStore()
const org = useOrgStore()

onMounted(async () => {
    await org.loadCurrentUserOrgs()
})
</script>
