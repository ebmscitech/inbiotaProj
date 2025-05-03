import * as yup from "yup";

const emailRules = (string) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegExp = /^(^\+|^08)((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const phoneHomeRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
// const phoneRegExp = /^(^\+|^08)(\d{3,4}-?){2}\d{3,4}$/;
const threeWord = /^(?:(?:^| )\S+ *){3,}$/;
const oneWord = /^(?:(?:^| )\S+ *){1,}$/;
const numberRegExp = /^([0]([.][0-9]+)?|[1-9]([0-9]+)?([.][0-9]+)?)$/;

export const RegisterSchema = yup.object().shape({
  completeName: yup.string().required("harus diisi"),
  homeTown: yup.string().required("harus diisi"),
  phoneNo: yup.string().matches(phoneRegExp, 'tidak valid, contoh : 08xxxx').min(10, "Phone number must be at least 10 characters long").required("harus diisi"),
  email: yup.string().email("tidak valid").required("harus diisi"),
  username: yup.string().required("harus diisi"),
  password: yup.string().required("harus diisi"),
  address: yup.string().required("harus diisi"),
  birthDate: yup.date()
    .max(new Date(), "Tanggal lahir tidak boleh di masa depan")
    .required("Tanggal lahir harus diisi")
});

export const AspirasiSchema = yup.object().shape({
  name: yup.string().required("harus diisi"),
  nomor_hp: yup.string().matches(phoneRegExp, 'tidak valid, contoh : 08xxxx').min(10, "Phone number must be at least 10 characters long").required("harus diisi"),
  email: yup.string().email("tidak valid"),
  nik: yup.string().matches(numberRegExp, 'Kolom ini harus berupa angka.').min(16, "NIK harus berisikan 16 angka").max(16, "NIK harus berisikan 16 angka"),
  // expectation: yup.string().matches(threeWord, 'minimal berisikan 3 kata.').required("harus diisi"),
});

export const DapilSchema = yup.object().shape({
  name: yup.string().required("harus diisi"),
  jumlah_kursi: yup.string().matches(numberRegExp, 'Kolom ini harus berupa angka.'),
});

export const PartaiSchema = yup.object().shape({
  name: yup.string().required("harus diisi"),
});

export const LoginSchema = yup.object().shape({
  username: yup.string().required("harus diisi"),
  password: yup.string().required("harus diisi"),
});

export const ProfileSchema = yup.object().shape({
  full_name: yup.string().required("harus diisi"),
  birth_place: yup.string().required("harus diisi"),
  mobile_phone: yup.string().matches(phoneRegExp, 'tidak valid, contoh : 08xxxx').min(10, "Phone number must be at least 10 characters long").required("harus diisi"),
  email: yup.string().email("tidak valid").required("harus diisi"),
  redirect_link: yup.string(),
  no_urut: yup.string().matches(/^[1-9][0-9]*$/, 'tidak valid, tidak boleh ada angka 0'),
});

export const OrganizationSchema = yup.object().shape({
  name: yup.string().required("harus diisi"),
  position: yup.string().required("harus diisi"),
  description: yup.string(),
});

export const AchievementSchema = yup.object().shape({
  name: yup.string().required("harus diisi"),
  account: yup.string().required("harus diisi"),
});

export const EducationSchema = yup.object().shape({
  name: yup.string().required("harus diisi"),
  account: yup.string().required("harus diisi"),
});

export const BackgroundSchema = yup.object().shape({
  name: yup.string().required("harus diisi"),
  account: yup.string().required("harus diisi"),
});
