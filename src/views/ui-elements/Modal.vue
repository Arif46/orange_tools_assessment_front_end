<template>
    <b-container>
        <b-row>
            <b-col cols="6">
                <b-card class="mt-5">
                    <h5 class="mb-4">Modal</h5>
                    <div>
                        <b-button variant="success" v-b-modal.modal-1>Launch modal</b-button>
                        <b-modal
                            id="modal-1"
                            ok-title="Submit"
                            ok-variant="success"
                            cancel-variant="danger"
                            cancel-title="Reject"
                            centered
                            title="Modal Header">
                            <p class="my-4">Hello from modal!</p>
                        </b-modal>
                    </div>
                </b-card>
            </b-col>
            <b-col cols="6">
                <b-card class="mt-5">
                    <h5 class="mb-4">Modal Large</h5>
                    <div>
                        <b-button variant="success" v-b-modal.modal-2>Launch modal</b-button>
                        <b-modal
                            id="modal-2"
                            ok-title="Submit"
                            ok-variant="success"
                            cancel-variant="danger"
                            cancel-title="Reject"
                            size="xl"
                            centered
                            title="Modal Header">
                            <p class="my-4">Hello from modal!</p>
                        </b-modal>
                    </div>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="6">
                <b-card class="mt-5">
                    <h5 class="mb-4">Modal Scrollable</h5>
                    <div>
                        <b-button variant="success" v-b-modal.modal-3>Launch modal</b-button>
                        <b-modal
                            id="modal-3"
                            ok-title="Submit"
                            ok-variant="success"
                            cancel-variant="danger"
                            cancel-title="Reject"
                            scrollable
                            centered
                            title="Modal Header">
                            <p class="my-4 pb-4" v-for="i in 10" :key="i">
                                <span class="font-weight-bold">What is Lorem Ipsum?</span> <br/>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </b-modal>
                    </div>
                </b-card>
            </b-col>
            <b-col cols="6">
                <b-card class="mt-5">
                    <h5 class="mb-4">Modal Withow Backdrop</h5>
                    <div>
                        <b-button variant="success" v-b-modal.modal-4>Launch modal</b-button>
                        <b-modal
                            id="modal-4"
                            ok-title="Submit"
                            ok-variant="success"
                            cancel-variant="danger"
                            cancel-title="Reject"
                            content-class="shadow"
                            hide-backdrop
                            centered
                            title="Modal Header">
                            <p class="my-4">Hello from modal!</p>
                        </b-modal>
                    </div>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="6">
                <b-card class="mt-5">
                    <h5 class="mb-4">Modal With Data Table</h5>
                    <div>
                        <b-button variant="success" v-b-modal.modal-5>Launch modal</b-button>
                        <b-modal
                            id="modal-5"
                            ok-title="Submit"
                            ok-variant="success"
                            cancel-variant="danger"
                            cancel-title="Reject"
                            size="xl"
                            centered
                            title="Modal Header">
                            <div class="table-wrapper">
                                <b-table
                                :items="items"
                                :fields="fields"
                                :sort-by.sync="sortBy"
                                :sort-desc.sync="sortDesc"
                                sort-icon-left
                                striped="true"
                                hover="true"
                                bordered="true"
                                responsive
                                >
                                    <template v-slot:cell(action)="">
                                        <a href="javascript:" class="action-btn edit"><i class="ri-pencil-fill"></i></a>
                                        <a href="javascript:" class="action-btn status"><i class="ri-eye-fill"></i></a>
                                        <a href="javascript:" class="action-btn active"><i class="ri-check-fill"></i></a>
                                        <a href="javascript:" class="action-btn delete"><i class="ri-delete-bin-2-line"></i></a>
                                    </template>
                                </b-table>
                            </div>
                        </b-modal>
                    </div>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
  data () {
    return {
      sortBy: 'division',
      sortDesc: false,
      fields: [
        { key: 'sl', sortable: true },
        { key: 'division', sortable: true },
        { key: 'district', sortable: true },
        { key: 'upozila', sortable: true },
        { key: 'market_name', sortable: true },
        { key: 'complain_no', sortable: true },
        { key: 'conviction_date', sortable: true },
        { key: 'action', sortable: false }
      ],
      items: [
        {
          isActive: true,
          sl: 1,
          division: 'Dhaka',
          district: 'Dhaka',
          upozila: 'DNCC',
          market_name: 'Abdullahpur Bazar',
          complain_no: 'Com-22/01',
          conviction_date: '27.01.2022',
          action: ''
        },
        {
          isActive: true,
          sl: 2,
          division: 'Chattagram',
          district: 'Chandpur',
          upozila: 'Hazigonj',
          market_name: 'Hazigonj Bazar',
          complain_no: 'Com-22/02',
          conviction_date: '28.01.2022',
          action: ''
        },
        {
          isActive: true,
          sl: 3,
          division: 'Barishal',
          district: 'Barishal',
          upozila: 'Banaripara',
          market_name: 'Notun Bazar',
          complain_no: 'Com-22/03',
          conviction_date: '29.01.2022',
          action: ''
        },
        {
          isActive: true,
          sl: 4,
          division: 'Khulna',
          district: 'Chuadanga',
          upozila: 'Alamdanga',
          market_name: 'Romij Shopping',
          complain_no: 'Com-22/04',
          conviction_date: '30.01.2022',
          action: ''
        }
      ]
    }
  }
}
</script>
