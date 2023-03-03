<template>
  <div>
    <b-row>
      <b-col sm="12">
        <div class="quick-filter-wrapper">
          <div class="quick-filter-left">
            <b-dropdown split split-variant="outline-secondary" size="sm" id="dropdown-form" :text="$t('globalTrans.column_visibility')" ref="dropdown">
              <b-dropdown-form>
                <div
                  class="form-group"
                  v-for="(field, index) in labelData"
                  :key="index"
                  >
                    <b-form-checkbox
                      :id="'checkbox-' + field.order"
                      v-model="field.show"
                      :name="'checkbox-' + field.order"
                      value=1
                      unchecked-value=0
                    >
                      {{ field.label }}
                    </b-form-checkbox>
                </div>
              </b-dropdown-form>
            </b-dropdown>
          </div>
          <div class="quick-filter-right">
            <b-form-group
              :label="$t('menu.perpage')"
              label-for="per-page-select"
            >
              <b-form-select
                id="per-page-select"
                v-model="search.limit"
                :options="pageOptions"
                size="sm"
              ></b-form-select>
            </b-form-group>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12" class="table-responsive">
        <slot v-if ="columns.filter(item => item.show === '1').length > 0">
          <b-table :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection" head-variant="primary" class="tg" :items="listData" :emptyText="$t('globalTrans.noDataFound')" show-empty striped bordered hover :fields="columns.filter(item => item.show === '1').sort((a, b) => { return a.order - b.order })">
            <template v-slot:cell(serial)="data">
              {{ $n(data.item.serial + paginations.slOffset) }}
            </template>
            <template v-slot:cell(year)="data">
              {{ EngBangNum(data.item.year) }}
            </template>
            <template v-slot:cell(start_date)="data">
              {{ EngBangNum(data.item.start_date) }}
            </template>
            <template v-slot:cell(end_date)="data">
              {{ EngBangNum(data.item.end_date) }}
            </template>
            <template v-slot:cell(meeting_date)="data">
              {{ EngBangNum(data.item.meeting_date) }}
            </template>
            <template v-slot:cell(contact_person_mobile)="data">
              {{ EngBangNum(data.item.contact_person_mobile) }}
            </template>
            <template v-slot:cell(contact_no)="data">
              {{ ($i18n.locale === 'bn') ? '০' : '0' }}{{ $n(data.item.contact_no, { useGrouping: false }) }}
            </template>
            <template v-slot:cell(total_capacity)="data">
              {{ $n(data.item.total_capacity, { useGrouping: false }) }}
            </template>
            <template v-slot:cell(approved_post)="data">
              {{ $n(data.item.approved_post) }}
            </template>
            <template v-slot:cell(alert_percentage)="data">
              {{ $n(data.item.alert_percentage) }}
            </template>
            <template v-slot:cell(role)="data">
              {{ ($i18n.locale === 'bn') ? data.item.role.role_name_bn : data.item.role.role_name }}
            </template>
            <template v-slot:cell(section_number)="data">
              {{ $n(data.item.section_number) }}
            </template>
            <template v-slot:cell(org)="data">
              {{ getSelectedOrgList(data.item.org) }}
            </template>
            <template v-slot:cell(logo)="data">
              <!-- <img :src="commonServiceBaseUrl + 'download-attachment?file=storage' + data.item.logo"> -->
              <image-show v-if="data.item.logo !== null" :img="data.item.logo" :imageUrl="imageUrl"/>
            </template>
            <template v-slot:cell(left_logo)="data">
              <image-show v-if="data.item.left_logo !== null" :img="data.item.left_logo" :imageUrl="imageUrl"/>
            </template>
            <template v-slot:cell(right_logo)="data">
              <image-show v-if="data.item.right_logo !== null" :img="data.item.right_logo" :imageUrl="imageUrl"/>
            </template>
            <!-- <template v-slot:cell(law_gazette)="data">
              <div class="text-center">
                <a v-if="data.item.law_gazette !== null" :href="fileUrl + 'download-attachment?file=' + data.item.law_gazette" class="badge badge-primary">
                  <i class="ri-cloud-fill"></i>
                  {{ $t('globalTrans.attachment') }}
                </a>
              </div>
            </template> -->
            <template v-slot:cell(sorting_order)="data" class="text-center">
              <slot v-if="orderChange == null">
                {{ $n(data.item.sorting_order) }}
              </slot>
              <span class="capitalize" v-else>
                <input @change="checkSortOrder(data.item,$event)"  type="number" :value="data.item.sorting_order"  style="width: 100px;margin:auto" class="form-control text-center"/>
              </span>
            </template>
            <template v-slot:cell(status)="data">
              <span class="badge badge-success" v-if="data.item.status == 1">{{$t('globalTrans.active')}}</span>
              <span class="badge badge-danger" v-else>{{$t('globalTrans.inactive')}}</span>
            </template>
            <template v-slot:cell(action)="data">
              <b-button v-if="actions.edit" v-b-modal.modal-form variant=" iq-bg-success mr-1" size="sm" @click="editData(data.item)" class="action-btn edit" :title="$t('globalTrans.edit')"><i class="ri-pencil-fill"></i></b-button>
              <b-button v-if="actions.details" v-b-modal.details variant=" action-btn status mr-1" size="sm" @click="detailsData(data.item)" class="action-btn status" :title="$t('globalTrans.details')"><i class="ri-eye-fill"></i></b-button>
              <b-button v-if="actions.approve" v-b-modal.modal-approve variant=" action-btn status mr-1" size="sm" @click="editData(data.item)" class="action-btn active" :title="$t('globalTrans.approve')"><i class="ri-check-line"></i></b-button>
              <b-button v-if="actions.remark" v-b-modal.modal-remark variant=" action-btn active mr-1" size="sm" @click="editData(data.item)" class="action-btn edit" :title="$t('globalTrans.remark')"><i class="ri-check-double-line"></i></b-button>
              <b-button v-if="actions.reject" v-b-modal.modal-reject variant=" action-btn delete mr-1" size="sm" @click="rejectData(data.item)" class="action-btn edit" :title="$t('globalTrans.reject')"><i class="ri-close-fill"></i></b-button>
              <b-button v-if="actions.toogle" :variant="data.item.status === 2 ? ' btn-danger' : ' btn-success'" size="sm" class="action-btn status" :title="data.item.status === 2 ? $t('globalTrans.inactive') : $t('globalTrans.active')" @click="removeData(data.item)">
                <i :class="data.item.status === 2  ? 'ri-toggle-line' : 'ri-toggle-fill'"></i>
              </b-button>
            </template>
            <template #custom-foot="" v-if="orderChange != null">
              <b-tr>
                <b-th :colspan="orderChange.colspan"></b-th>
                <b-th class="text-center">
                  <button class="btn btn-primary btn-sm" v-on:click="SubmitData()">
                    <i class="fas fa-list"></i>Submit
                  </button>
                </b-th>
                <b-th colspan="2"></b-th>
              </b-tr>
            </template>
          </b-table>
        </slot>
        <div class="pagination-wrapper mt-3" v-if="columns.filter(item => item.show === '1').length > 0">
          <b-pagination
            v-model="paginations.currentPage"
            :perPage="search.limit"
            :total-rows="paginations.totalRows"
            @input="searchData"
          />
          </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import ModalBaseMasterList from '@/mixins/list'
import RestApi, { commonServiceBaseUrl } from '@/config/api_config'

export default {
  mixins: [ModalBaseMasterList],
  props: ['componentId', 'labelData', 'columns', 'search', 'searchData', 'paginations', 'actions', 'orderChange', 'imageUrl'],
  data () {
    return {
      sortBy: '',
      sortDesc: true,
      sortDirection: 'desc',
      commonServiceBaseUrl: commonServiceBaseUrl,
      editItemId: 0,
      detailItemId: 0
    }
  },
  computed: {
    pageOptions () {
      return this.$store.state.commonObj.pageOptions
    }
  },
  methods: {
    imageShow (item) {
      RestApi.getData(commonServiceBaseUrl, 'download-attachment?file=' + item).then(response => {
        if (response.success) {
          return response.data
        }
      }, error => {
        if (error) {
          //
        }
      })
    },
    checkSortOrder: function (item, event) {
      if (typeof this.orderChange.checkList !== 'undefined') {
        item.old_serial = item.sorting_order
        item.sorting_order = event.target.value
      }
    },
    getSelectedOrgList (orgs = null) {
      if (orgs != null) {
        if (orgs.length > 0) {
          const orgList = orgs.map(item => {
            return this.$i18n.locale === 'en' ? item.abbreviation : item.abbreviation_bn
          })
          if (orgList === null || orgList === undefined) {
            return ''
          }
          return orgList.join(', ')
        }
      }
    },
    EngBangNum (n) {
      if (this.$i18n.locale === 'bn') {
        return n.replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d])
      } else {
        return n.replace(/[০-৯]/g, d => '০১২৩৪৫৬৭৮৯'.indexOf(d))
      }
    },
    editData (item) {
      this.$emit('editMethodInParent', item, 1)
    },
    detailsData (item) {
      this.$emit('editMethodInParent', item, 3)
    },
    removeData (item) {
      this.$emit('editMethodInParent', item, 2)
    },
    rejectData (item) {
      this.$emit('editMethodInParent', item, 4)
    },
    async confirmData () {
      const data = []
      this.listData.map((item, index) => {
        const dataOrder = {
          id: item.id,
          sorting_order: item.sorting_order
        }
        data.push(dataOrder)
      })
      let result = null
      this.$store.dispatch('mutateCommonProperties', { loading: true, listReload: false })
      result = await RestApi.postData(commonServiceBaseUrl, this.orderChange.urlSave, data)
      if (result.success) {
        this.getComponentById(this.componentId)
        this.$store.dispatch('mutateCommonProperties', { loading: false, listReload: false })
        this.$store.commit('mutateDropdownCommonConfig', { hasDropdownLoaded: false })
        this.$toast.success({
          title: 'Success',
          message: 'Data saved successfully',
          color: '#D6E09B'
        })
        this.loadData()
      }
    },
    async SubmitData () {
      this.$swal({
        title: this.$t('globalTrans.recommendentChangeMsg'),
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        focusConfirm: false
      }).then((resultSwal) => {
        if (resultSwal.isConfirmed) {
          this.confirmData()
        }
      })
    },
    getComponentById (componentId) {
      if (componentId === 3) {
        this.$store.dispatch('BazarMonitoringService/mutateCommonObj', { hasDropdownLoaded: false })
      } else if (componentId === 9) {
        this.$store.dispatch('ExportTrophyCipService/mutateCommonObj', { hasDropdownLoaded: false })
      } else if (componentId === 1) {
        this.$store.dispatch('CommonService/mutateCommonObj', { hasDropdownLoaded: false })
      }
    }
  }
}
</script>
