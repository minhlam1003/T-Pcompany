import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, X } from 'lucide-react';
import { entrySchema, EntryType, FIELD_LABELS } from '../types';

interface Props {
  initialData?: EntryType;
  onSave: (data: EntryType) => void;
  onCancel: () => void;
}

const Field = ({ label, name, register, error, type = "text", placeholder, description }: any) => (
  <div className="flex flex-col gap-[6px] w-full">
    <div>
      <label className="text-[13px] font-semibold text-[#4B5563]">{label}</label>
      {description && <p className="text-[12px] leading-snug text-[#9CA3AF] mt-[2px]">{description}</p>}
    </div>
    <input 
      type={type} 
      {...register(name)} 
      placeholder={placeholder}
      className="border border-[#D1D5DB] rounded-[6px] px-[10px] py-[9px] w-full text-[14px] outline-none focus:border-[#2563EB] focus:ring-[2px] focus:ring-[rgba(37,99,235,0.1)] bg-white placeholder-[#9CA3AF]" 
    />
    {error && <span className="text-red-500 text-xs">{error.message}</span>}
  </div>
);

const SelectField = ({ label, name, register, options, error, description }: any) => (
  <div className="flex flex-col gap-[6px] w-full">
    <div>
      <label className="text-[13px] font-semibold text-[#4B5563]">{label}</label>
      {description && <p className="text-[12px] leading-snug text-[#9CA3AF] mt-[2px]">{description}</p>}
    </div>
    <select 
      {...register(name)} 
      className="border border-[#D1D5DB] rounded-[6px] px-[10px] py-[9px] w-full text-[14px] outline-none focus:border-[#2563EB] focus:ring-[2px] focus:ring-[rgba(37,99,235,0.1)] bg-white"
    >
      <option value="">-- Chọn --</option>
      {options.map((o: any) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
    {error && <span className="text-red-500 text-xs">{error.message}</span>}
  </div>
);

const TextArea = ({ label, name, register, error, rows = 3, placeholder, description }: any) => (
  <div className="flex flex-col gap-[6px] w-full col-span-1 md:col-span-2 lg:col-span-3">
    <div>
      <label className="text-[13px] font-semibold text-[#4B5563]">{label}</label>
      {description && <p className="text-[12px] leading-snug text-[#9CA3AF] mt-[2px]">{description}</p>}
    </div>
    <textarea 
      rows={rows} 
      {...register(name)}
      placeholder={placeholder}
      className="border border-[#D1D5DB] rounded-[6px] px-[10px] py-[9px] w-full text-[14px] outline-none focus:border-[#2563EB] focus:ring-[2px] focus:ring-[rgba(37,99,235,0.1)] bg-white resize-y placeholder-[#9CA3AF]" 
    />
    {error && <span className="text-red-500 text-xs">{error.message}</span>}
  </div>
);

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="bg-white border border-[#E5E7EB] rounded-[12px] mb-6 overflow-hidden flex flex-col shadow-sm">
    <div className="bg-[#FBFBFB] border-b border-[#E5E7EB] px-[24px] py-[16px]">
      <h3 className="text-[15px] font-semibold text-[#111827] m-0">{title}</h3>
    </div>
    <div className="p-[24px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-[20px]">
        {children}
      </div>
    </div>
  </div>
);

export function EntryForm({ initialData, onSave, onCancel }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<EntryType>({
    resolver: zodResolver(entrySchema),
    defaultValues: initialData || { 
      id: crypto.randomUUID(),
      ngonNgu: "Tiếng Việt",
      dinhDangDuLieu: "PDF",
      thoiHanBaoQuan: "Vĩnh viễn"
    }
  });

  const onSubmit = (data: EntryType) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pb-12 h-full flex flex-col">
      <div className="sticky top-0 z-20 bg-[#F9FAFB] flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center py-[16px] mb-[24px]">
        <h2 className="text-[20px] font-semibold text-[#111827] m-0">
          {initialData ? "Chỉnh sửa hồ sơ" : "Thêm mục mới"}
        </h2>
        <div className="flex gap-3 w-full sm:w-auto">
          <button 
            type="button" 
            onClick={onCancel}
            className="flex-1 sm:flex-none flex items-center justify-center gap-[8px] bg-white border border-[#D1D5DB] text-[#374151] px-[18px] py-[10px] rounded-[6px] text-[14px] font-medium transition-colors cursor-pointer hover:bg-gray-50 shadow-sm"
          >
            <X size={16} /> Hủy
          </button>
          <button 
            type="submit"
            className="flex-1 sm:flex-none flex items-center justify-center gap-[8px] bg-[#2563EB] text-white px-[18px] py-[10px] rounded-[6px] text-[14px] font-medium transition-colors cursor-pointer hover:bg-blue-700 shadow-sm"
          >
            <Save size={16} /> Lưu Mục Nhập
          </button>
        </div>
      </div>

      <Section title="1. Thông tin chung dữ liệu">
        <Field label={FIELD_LABELS['dinhDanh']} name="dinhDanh" register={register} error={errors.dinhDanh} description="Một dãy kí tự hoặc số thể hiện tính đơn nhất" placeholder="VD: H20.42.13.8" />
        <Field label={FIELD_LABELS['nhanDe']} name="nhanDe" register={register} error={errors.nhanDe} description="Nhan đề của bộ thông tin, dữ liệu" placeholder="VD: Hồ sơ cấp giấy chứng nhận QSDĐ lần đầu năm 2005" />
        <Field label={FIELD_LABELS['loaiDuLieu']} name="loaiDuLieu" register={register} error={errors.loaiDuLieu} description="Mô tả chi tiết cho từng loại dữ liệu (đất đai, môi trường...)" placeholder="VD: Dữ liệu lĩnh vực đất đai" />
        <Field label={FIELD_LABELS['nguonDuLieu']} name="nguonDuLieu" register={register} error={errors.nguonDuLieu} description="Nguồn gốc mà dữ liệu được tạo thành" placeholder="VD: Chi nhánh Văn phòng Đăng ký Đất đai huyện Cai Lậy" />
        <Field label={FIELD_LABELS['ngayPhatHanh']} name="ngayPhatHanh" register={register} error={errors.ngayPhatHanh} description="Ngày phát hành thông tin, dữ liệu" placeholder="DD/MM/YYYY (VD: 14/01/2026)" />
        <Field label={FIELD_LABELS['chuDe']} name="chuDe" register={register} error={errors.chuDe} description="Mô tả nội dung tóm lược về chủ đề của thông tin" placeholder="VD: Hồ sơ cấp giấy chứng nhận QSDĐ lần đầu năm 2005..." />
        <Field label={FIELD_LABELS['ngonNgu']} name="ngonNgu" register={register} error={errors.ngonNgu} description="Ngôn ngữ trong tài liệu thuộc hồ sơ" placeholder="VD: Tiếng Việt" />
        <Field label={FIELD_LABELS['dinhDangDuLieu']} name="dinhDangDuLieu" register={register} error={errors.dinhDangDuLieu} description="Định dạng vật lý và kích thước" placeholder="VD: PDF" />
        <Field label={FIELD_LABELS['phamViDuLieu']} name="phamViDuLieu" register={register} error={errors.phamViDuLieu} description="Thông tin liên quan đến quy mô, phạm vi hoặc mức độ bao quát" placeholder="VD: Huyện Cai Lậy, tỉnh Tiền Giang" />
        
        <TextArea label={FIELD_LABELS['tomTat']} name="tomTat" register={register} error={errors.tomTat} description="Mô tả tóm tắt nội dung thông tin, dữ liệu" placeholder="VD: Hồ sơ cấp GCN QSDĐ lần đầu năm 2005; Họ và tên Lê Văn Năm..." rows={3} />
        <TextArea label={FIELD_LABELS['ghiChu']} name="ghiChu" register={register} error={errors.ghiChu} description="Các ghi chú bổ sung thông tin liên quan" placeholder="(Không để trống, ghi chú thêm nếu có)" rows={2} />
      </Section>

      <Section title="2. Tổ chức tạo lập thông tin, dữ liệu">
        <Field label={FIELD_LABELS['taolap_Ten']} name="taolap_Ten" register={register} error={errors.taolap_Ten} description="Tên cá nhân/tổ chức tạo lập" placeholder="VD: CÔNG TY CỔ PHẦN CÔNG NGHỆ OSP" />
        <Field label={FIELD_LABELS['taolap_DaiDien']} name="taolap_DaiDien" register={register} error={errors.taolap_DaiDien} description="Người đại diện tổ chức" placeholder="VD: Lê Quang Dũng" />
        <Field label={FIELD_LABELS['taolap_ChucVu']} name="taolap_ChucVu" register={register} error={errors.taolap_ChucVu} description="Chức vụ người đại diện" placeholder="VD: Chủ tịch Hội đồng quản trị" />
        <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Field label={FIELD_LABELS['taolap_DiaChi']} name="taolap_DiaChi" register={register} error={errors.taolap_DiaChi} description="Địa chỉ trụ sở cơ quan" placeholder="VD: Tầng 4, tòa nhà The Garden Hill..." />
          <Field label={FIELD_LABELS['taolap_SDT']} name="taolap_SDT" register={register} error={errors.taolap_SDT} description="Số điện thoại cơ quan" placeholder="VD: 02422102709" />
          <Field label={FIELD_LABELS['taolap_Email']} name="taolap_Email" register={register} error={errors.taolap_Email} description="Địa chỉ thư điện tử" placeholder="VD: email@example.com" />
        </div>
      </Section>

      <Section title="3. Thu thập & Cung cấp thông tin">
        <Field label={FIELD_LABELS['cungcap_Ten']} name="cungcap_Ten" register={register} error={errors.cungcap_Ten} description="Tên cá nhân/tổ chức thu thập, cung cấp" placeholder="VD: Chi nhánh VPĐK Đất đai huyện Cai Lậy" />
        <Field label={FIELD_LABELS['cungcap_DaiDien']} name="cungcap_DaiDien" register={register} error={errors.cungcap_DaiDien} description="Người đại diện tổ chức thu thập, cung cấp" placeholder="VD: Nguyễn Văn A" />
        <Field label={FIELD_LABELS['cungcap_ChucVu']} name="cungcap_ChucVu" register={register} error={errors.cungcap_ChucVu} description="Chức vụ người đại diện" placeholder="VD: Giám đốc Chi nhánh" />
        <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Field label={FIELD_LABELS['cungcap_DiaChi']} name="cungcap_DiaChi" register={register} error={errors.cungcap_DiaChi} description="Địa chỉ trụ sở cơ quan thu thập, cung cấp" placeholder="VD: xã Bình Phú, huyện Cai Lậy" />
          <Field label={FIELD_LABELS['cungcap_SDT']} name="cungcap_SDT" register={register} error={errors.cungcap_SDT} description="Số điện thoại cơ quan" placeholder="VD: 0123456789" />
          <Field label={FIELD_LABELS['cungcap_Email']} name="cungcap_Email" register={register} error={errors.cungcap_Email} description="Địa chỉ thư điện tử" placeholder="VD: ...@gmail.com" />
        </div>
        <Field label={FIELD_LABELS['donViCungCapChiuTrachNhiem']} name="donViCungCapChiuTrachNhiem" register={register} error={errors.donViCungCapChiuTrachNhiem} description="Đơn vị chịu trách nhiệm cung cấp" placeholder="VD: Chi nhánh VPĐK Đất đai huyện Cai Lậy" />
        <Field label={FIELD_LABELS['khaNangCungCap']} name="khaNangCungCap" register={register} error={errors.khaNangCungCap} description="Khai thác: tra cứu, trích, sao y..." placeholder="Nhập hình thức khai thác..." />
        <Field label={FIELD_LABELS['thuTucCungCap']} name="thuTucCungCap" register={register} error={errors.thuTucCungCap} description="Điều kiện, thủ tục cung cấp, sử dụng" placeholder="Nhập điều kiện / thủ tục..." />
      </Section>

      <Section title="4. Thông tin pháp lý & Liên kết">
        <Field label={FIELD_LABELS['banQuyen']} name="banQuyen" register={register} error={errors.banQuyen} description="Thông tin liên quan đến bản quyền" placeholder="(Không để trống)" />
        <Field label={FIELD_LABELS['donViLienQuan']} name="donViLienQuan" register={register} error={errors.donViLienQuan} description="Tên đơn vị phối hợp tạo lập" placeholder="VD: UBND xã Bình Phú" />
        <Field label={FIELD_LABELS['duLieuLienQuan']} name="duLieuLienQuan" register={register} error={errors.duLieuLienQuan} description="Thông tin, tài liệu tham khảo" placeholder="(Không để trống)" />
      </Section>

      <Section title="5. Dữ liệu đất đai (nếu có)">
        <Field label={FIELD_LABELS['dat_HoTenChu']} name="dat_HoTenChu" register={register} error={errors.dat_HoTenChu} description="Họ tên chủ sử dụng đất" placeholder="VD: Lê Văn Năm" />
        <Field label={FIELD_LABELS['dat_SoToBanDo']} name="dat_SoToBanDo" register={register} error={errors.dat_SoToBanDo} description="Ký hiệu, số tờ bản đồ" placeholder="VD: 02" />
        <Field label={FIELD_LABELS['dat_SoThua']} name="dat_SoThua" register={register} error={errors.dat_SoThua} description="Số hiệu thửa đất" placeholder="VD: 1908" />
        <Field label={FIELD_LABELS['dat_LoaiDat']} name="dat_LoaiDat" register={register} error={errors.dat_LoaiDat} description="Đất ở, Đất trồng cây..." placeholder="VD: Đất trồng cây lâu năm (CLN)" />
        <Field label={FIELD_LABELS['dat_DienTich']} name="dat_DienTich" register={register} error={errors.dat_DienTich} description="Diện tích pháp lý (m2)" placeholder="VD: 3967" />
        <Field label={FIELD_LABELS['dat_SoGCN']} name="dat_SoGCN" register={register} error={errors.dat_SoGCN} description="Giấy chứng nhận QSDĐ" placeholder="VD: 00553" />
        <Field label={FIELD_LABELS['dat_SoQuyetDinh']} name="dat_SoQuyetDinh" register={register} error={errors.dat_SoQuyetDinh} description="Số quyết định cấp GCN" placeholder="VD: 286/QĐ.UB" />
        <Field label={FIELD_LABELS['dat_NgayCap']} name="dat_NgayCap" register={register} error={errors.dat_NgayCap} description="Ngày, tháng, năm cấp GCN" placeholder="DD/MM/YYYY (VD: 29/3/2004)" />
        <Field label={FIELD_LABELS['loaiHoSo']} name="loaiHoSo" register={register} error={errors.loaiHoSo} description="Phân loại hồ sơ đất đai" placeholder="VD: Đăng ký cấp giấy chứng nhận quyền sử dụng đất" />
      </Section>

      <Section title="6. Thông tin hồ sơ lưu trữ">
        <Field label={FIELD_LABELS['luutru_MaHoSo']} name="luutru_MaHoSo" register={register} error={errors.luutru_MaHoSo} description="Mã = [Mã cơ quan].[Năm...]" placeholder="VD: H20.42.13.8.2005.20.02.00.49878" />
        <Field label={FIELD_LABELS['luutru_TieuDe']} name="luutru_TieuDe" register={register} error={errors.luutru_TieuDe} description="Tiêu đề hồ sơ" placeholder="VD: Hồ sơ cấp giấy chứng nhận QSDĐ lần đầu năm 2005..." />
        <Field label={FIELD_LABELS['ngayGiaoNop']} name="ngayGiaoNop" register={register} error={errors.ngayGiaoNop} description="Ngày giao nộp tài liệu" placeholder="DD/MM/YYYY (VD: 14/01/2026)" />
        <Field label={FIELD_LABELS['thoiHanBaoQuan']} name="thoiHanBaoQuan" register={register} error={errors.thoiHanBaoQuan} description="Thời hạn bảo quản" placeholder="VD: Vĩnh viễn" />
        <Field label={FIELD_LABELS['luutru_ThoiGianBD']} name="luutru_ThoiGianBD" register={register} error={errors.luutru_ThoiGianBD} description="Cho phép định dạng DD/MM/YYYY, v.v." placeholder="VD: 29/08/2005" />
        <Field label={FIELD_LABELS['luutru_ThoiGianKT']} name="luutru_ThoiGianKT" register={register} error={errors.luutru_ThoiGianKT} description="Cho phép định dạng DD/MM/YYYY, v.v." placeholder="VD: 07/04/2006" />
        <Field label={FIELD_LABELS['luutru_TuKhoa']} name="luutru_TuKhoa" register={register} error={errors.luutru_TuKhoa} description="Các từ khóa tìm kiếm (nếu có)" placeholder="Nhập từ khóa..." />
        <Field label={FIELD_LABELS['luutru_TongSoTaiLieu']} name="luutru_TongSoTaiLieu" register={register} error={errors.luutru_TongSoTaiLieu} description="Tài liệu văn bản, kỹ thuật, âm bản..." placeholder="VD: 05" />
        <Field label={FIELD_LABELS['luutru_SoLuongTo']} name="luutru_SoLuongTo" register={register} error={errors.luutru_SoLuongTo} description="Dành riêng cho tài liệu giấy được số hóa" placeholder="VD: 09" type="number" />
        <Field label={FIELD_LABELS['luutru_SoLuongTrang']} name="luutru_SoLuongTrang" register={register} error={errors.luutru_SoLuongTrang} description="Số lượng trang" placeholder="VD: 13" type="number" />
        
        <SelectField 
          label={FIELD_LABELS['luutru_TinhTrangVatLy']} 
          name="luutru_TinhTrangVatLy" 
          register={register} 
          error={errors.luutru_TinhTrangVatLy}
          description="Tình trạng vật lý (nếu có)"
          options={[
            { value: "01", label: "01: Tốt" },
            { value: "02", label: "02: Bình thường" },
            { value: "03", label: "03: Hỏng" }
          ]}
        />
        <Field label={FIELD_LABELS['luutru_TepTin']} name="luutru_TepTin" register={register} error={errors.luutru_TepTin} description="Trường hợp số hóa thành tệp tin" placeholder="VD: Tệp đính kèm PDF" />
        <Field label={FIELD_LABELS['luutru_SoKyHieu']} name="luutru_SoKyHieu" register={register} error={errors.luutru_SoKyHieu} description="Số hồ sơ (phải có khi chỉnh lý)" placeholder="VD: 49878" />
        <Field label={FIELD_LABELS['luutru_HopSo']} name="luutru_HopSo" register={register} error={errors.luutru_HopSo} description="Số Hộp (phải có khi chỉnh lý)" placeholder="VD: 2494" />
        <Field label={FIELD_LABELS['luutru_Ke']} name="luutru_Ke" register={register} error={errors.luutru_Ke} description="Kệ chứa thiết bị" placeholder="VD: 62" />
        <Field label={FIELD_LABELS['luutru_Kho']} name="luutru_Kho" register={register} error={errors.luutru_Kho} description="Ghi tên kho" placeholder="VD: Kho số 1 - Chi nhánh VPĐK Đất đai Khu vực X" />
      </Section>
    </form>
  );
}
