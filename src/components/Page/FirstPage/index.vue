<template>
  <Wrapper>
    <v-img :src="require('@/assets/logo_moi480.png')" class="my-3" contain height="160" />
    <WrapperText>
      <Title>การจัดอบรมสัมมนาเชิงปฏิบัติการ</Title>
      <SubTitle>เรื่อง การเพิ่มประสิทธิภาพการปฏิบัติงานของเจ้าหน้าที่สำนักงานอุตสาหกรรมจังหวัด</SubTitle>
      <Content>ระหว่างวันที่ ๑๙ - ๒๑ ตุลาคม ๒๕๖๓</Content>
      <SubContent>ณ ห้องปฏิบัติการคอมพิวเตอร์ ชั้น ๕ สำนักบริการคอมพิวเตอร์</SubContent>
      <SubContent>มหาวิทยาลัยเกษตรศาสตร์ (บางเขน)</SubContent>
    </WrapperText>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">ตรวจสอบการลงทะเบียน</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                <v-form @submit.prevent="submitTrack" ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    class="text-custom"
                    v-model="getPhone.Phone"
                    :rules="phoneRules"
                    :counter="10"
                    maxlength="10"
                    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                    label="เบอร์โทรศัพท์"
                    type="number"
                    required
                    :autofocus="true"
                  ></v-text-field>
                </v-form>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="submitTrack">ตกลง</v-btn>
            <v-btn color="blue darken-1" text @click="close">ยกเลิก</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn class="purple" to="page" dark>ลงทะเบียน</v-btn>
      <v-btn class="orange ml-1" @click="tracking" dark>ตรวจสอบการลงทะเบียน</v-btn> <br>
      <v-btn class="light-green accent-4 mt-2" dark target="_blank" href="https://www.google.com/maps/place/KU+Home+@+Kasetsart+University+Bangkok/@13.8453406,100.567736,251m/data=!3m1!1e3!4m8!3m7!1s0x30e29cddec0efb41:0x4fac1d0b01aca6c8!5m2!4m1!1i2!8m2!3d13.845122!4d100.5676568"><v-icon class="mr-1" color="red">mdi-google-maps</v-icon>แผนที่โรงแรม</v-btn>
      <v-btn class="light-green accent-4 mt-2 ml-1" dark target="_blank" href="https://www.google.com/maps/place/%E0%B8%AA%E0%B8%B3%E0%B8%99%E0%B8%B1%E0%B8%81%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%84%E0%B8%AD%E0%B8%A1%E0%B8%9E%E0%B8%B4%E0%B8%A7%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C+%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%A5%E0%B8%B1%E0%B8%A2%E0%B9%80%E0%B8%81%E0%B8%A9%E0%B8%95%E0%B8%A3%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%95%E0%B8%A3%E0%B9%8C+%E0%B8%9A%E0%B8%B2%E0%B8%87%E0%B9%80%E0%B8%82%E0%B8%99/@13.8455694,100.5664277,538m/data=!3m1!1e3!4m5!3m4!1s0x0:0x2d8c77dfc235fd03!8m2!3d13.844606!4d100.5675213"><v-icon class="mr-1" color="red">mdi-google-maps</v-icon>แผนที่ห้องอบรม</v-btn>
  </Wrapper>
</template>

<script>
import { Wrapper, WrapperText, Title, SubTitle, Content, SubContent } from "./index.style";

export default {
  data() {
    return {
      valid: true,
      dialog: false,
      phoneRules: [
        v => !!v || "กรุณากรอกเบอร์โทรศัพท์",
        v => (v && v.length == 10) || "กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก",
      ],
    }
  },
  components: {
    Wrapper,
    WrapperText,
    Title,
    SubTitle,
    Content,
    SubContent
  },
  computed:{
    getPhone(){
      return this.$store.getters.getPhone
    },
    getUserTrack(){
      return this.$store.getters.getUserTrack
    }
  },
  methods:{
    tracking(){      
      this.dialog = true      
    },
    async submitTrack(){
      if (this.$refs.form.validate() == true) {
        await this.$store.dispatch('userTracking')
        await this.$store.dispatch('partnerPhone')
      } else {
        this.$refs.form.validate();
        this.$store.dispatch('alertError')
      }
    },
    close(){
      this.dialog = false
      this.$store.getters.getPhone.Phone = ''
      this.$refs.form.resetValidation()
    }
  },
}
</script>