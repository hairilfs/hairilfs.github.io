$(function () {
      var dn = new Date();
      var yn = dn.getFullYear();
      var yb = yn-1;

      var options = "<option value="+yb+">"+yb+"</option>";
          options = options + "<option value="+yn+">"+yn+"</option>";

      $('select[name=thn]').append(options);
      $('select[name=thn]').val(yn);
      $('.panel-body').eq(1).hide();

      $('.form-horizontal').submit(function(e){
        $('.tbl-bordered').hide();
        $('strong').hide();
        $('.panel-body').eq(1).show();
        $('.progress').show();
        $('#collapseOne').collapse('show');

        var idp = $('input[name=idp]').val();
        var bln = $('select[name=bln]').val();
        var thn = $('select[name=thn]').val();
        var url = 'http://ibacor.com/api/tagihan-pln';

        $.get(url, {idp: idp, bln: bln, thn: thn}, function(resp){
          console.log(resp);
          $('.progress').hide();
          $('.tbl-bordered').show();
          if (resp.status == 'success') {
            var rp = numeral(resp.data.tagihan).format('0,0');
                rp = rp.replace(/\,/g, '.');

            $('#tbl_idplg').html(resp.data.idpel);
            $('#tbl_nama').html(resp.data.nama);
            $('#tbl_alamat').html(resp.data.alamat);
            $('#tbl_trf').html(resp.data.tarif+'/'+resp.data.daya);
            $('#tbl_kwh').html(resp.data.pemkwh);
            $('#tbl_blnthn').html(resp.data.namathblrek);
            $('#tbl_rp').html('Rp '+rp);
            $('#tbl_bilang').html(resp.data.terbilang);
          } else {
            $('.tbl-bordered').hide();
            $('strong').show();            
          }
        }, 'json');
        e.preventDefault();
      });
    });