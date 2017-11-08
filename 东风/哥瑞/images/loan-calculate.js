// var $ = $ || function() { };
var Loan = (function () {
    function Loan() {
        // 首付
        this.downPayment = null;
        // 贷款额
        this.loan = null;
        // 月供
        this.monthPayment = null;
        // 手续费
        this.charges = null;
        // 购置税
        this.tax = null;
    }
    return Loan;
})();

var Calculator = (function () {
    function Calculator() {
        // 价格
        this.price = -1;
        // 首付比例
        this.downPayRate = 0;
        // 分期数
        this.stage = 12;
        // 手续费向量
        this.chargesRateVector = { _12: 0.04, _18: 0.06, _24: 0.08, _36: 0.12 };
        // 手续费率
        this.chargesRate = 0.04;
        // 购置税税率
        this.taxRate = 0;
        this.loan = new Loan();
    }
    // 设置计划
    Calculator.prototype.setPlan = function (plan, taxRate) {
        if (typeof taxRate === "undefined") { taxRate = null; }
        if (typeof plan == 'function') {
            plan.call(this);
        } else if (typeof plan == 'number') {
            this.chargesRate = plan;
            if (typeof taxRate == 'number') {
                this.taxRate = taxRate;
            }
        }
    };

    // 计算结果
    Calculator.prototype.calculate = function () {
        for (var poto in this) {
            if (typeof this[poto] == 'number') {
                if (this[poto] == -1) {
                    return null;
                }
            }
        }
        this.loan.downPayment = Math.round(this.price * this.downPayRate * 100) / 100;
        this.loan.tax = Math.round((this.price / 1.17) * this.taxRate * 100) / 100;
        this.loan.loan = Math.round((this.price - this.loan.downPayment + this.loan.tax) * 100) / 100;
        this.loan.monthPayment = Math.round(this.loan.loan / this.stage * 100) / 100;
        this.loan.charges = Math.round(this.loan.loan * this.chargesRate * 100) / 100;
        return this.loan;
    };
    return Calculator;
})();

// 文档初始化后开始
$(function () {
    var cal = new Calculator();

    $.ajax({
        'url': 'http://www.wdhac.com.cn/carprice.php?cid=12',
        'dataType': 'jsonp'
    }).success(function (data) {
        // 初始化价格
        var carTypes = '<a href="javascript:;" onclick="selectType(this);" data-price="139800">1.8L 6MT 舒适版</a><a href="javascript:;" onclick="selectType(this);" data-price="149800">1.8L CVT 舒适版</a><a href="javascript:;" onclick="selectType(this);" data-price="162800">1.8L CVT 豪华版</a>';
        carTypes = data.data;
        carTypes = carTypes.replace(/a href="javascript:;" onclick="selectType\(this\);"/g, 'option');
        carTypes = carTypes.replace(/\/a>/g, '/option>');
        carTypes = carTypes.replace(/data-price/g, 'value');

        // 初始化经销商绑定
        var testDriveDealerData = window.testDriveDealerData || { p: {}, c: {} };
        var $prov = $('#d_loan_prov');
        var $city = $('#d_loan_city');
        var provHtml = '';
        $.each(testDriveDealerData.p, function (id, name) {
            provHtml += '<option value="' + id + '">' + name + '</option>';
        });
        $prov.append(provHtml).on('change', function () {
            var provId = $(this).val();
            var citys = testDriveDealerData.c[provId];
            var cityHtml = '<option value="">请选择城市</option>';
            $.each(citys, function (id, name) {
                cityHtml += '<option value="' + id + '">' + name + '</option>';
            });
            $city.html(cityHtml);
        });

        // 车型选择框
        var $cartype = $('#d_loan_cartype').html(carTypes);

        // 价格框子
        var $price = $('#d_lian_price').val(($cartype.val() == '0') ? '敬请期待' : $cartype.val());

        // 首付比例选择框
        var $downPaymentCheckboxs = $('#d_loan_downpay_rate_check>span');

        // 首付比例输入框
        var $downPaymentRate = $('#d_loan_downpay_rate');

        // 分期选择框
        var $stageCheckboxs = $('#d_loan_stage>span');

        // 添加事件监听
        var $wapper = $('#d_calculate');
        var changed = function () {
            var loan = cal.calculate();
            if (loan) {
                $("#d_loan_downpay").val(loan.downPayment + '元');
                $("#d_loan_loan").val(loan.loan + '元');
                $("#d_loan_monthpay").val(loan.monthPayment + '元');
                $("#d_loan_charges").val(loan.charges + '元');
                $('#d_loan_taxinput>input').val(loan.tax + '元');
            }
        };

        // 更改计划
        $('#d_loan_plan').on('change', function () {
            // 重置
            $downPaymentCheckboxs.attr('disabled', null);
            $stageCheckboxs.attr('disabled', null);
            $downPaymentRate.data('disabled', null).prev('label').removeClass('d-forbid');
            $downPaymentCheckboxs.children('label').removeClass('d-forbid');
            $stageCheckboxs.children('label').removeClass('d-forbid');
            $('#d_loan_loan_tip, #d_loan_taxinput, #d_loan_tailpay').hide();

            cal.chargesRateVector = { _12: 0.04, _18: 0.06, _24: 0.08, _36: 0.12 };
            cal.taxRate = 0;

            // 计划分支
            var flag = Number($(this).val());
            switch (flag) {
                case 2:
                    // 气球贷（3-2-4）
                    cal.setPlan(function () {
                        $('#d_loan_tailpay').val('40').show();
                        $stageCheckboxs.eq(2).trigger('click').siblings().attr('disabled', 'disabled').children('label').addClass('d-forbid');
                        $downPaymentRate.data('disabled', 'disabled').prev('label').addClass('d-forbid');
                        $downPaymentCheckboxs.eq(2).trigger('click').siblings().attr('disabled', 'disabled').children('label').addClass('d-forbid');
                    });
                    break;
                case 3:
                    // 5050
                    cal.setPlan(function () {
                        //$('#d_loan_taxinput, #d_loan_tailpay').hide();
                        $stageCheckboxs.eq(0).trigger('click').siblings().attr('disabled', 'disabled').children('label').addClass('d-forbid');
                        $downPaymentRate.data('disabled', 'disabled').prev('label').addClass('d-forbid');
                        $downPaymentCheckboxs.eq(4).trigger('click').siblings().attr('disabled', 'disabled').children('label').addClass('d-forbid');
                    });
                    break;
                case 4:
                    // 组合贷（含税）
                    cal.setPlan(function () {
                        // 修改手续费向量
                        this.chargesRateVector = { _12: 0.0597, _18: 0.06, _24: 0.1169, _36: 0.1760 };
                        this.taxRate = 0.05;

                        $('#d_loan_taxinput, #d_loan_loan_tip').show();
                        $stageCheckboxs.eq(1).attr('disabled', 'disabled').children('label').addClass('d-forbid');
                        $stageCheckboxs.eq(0).trigger('click');
                        $downPaymentCheckboxs.eq(0).trigger('click');
                    });
                    break;
                default:
                    cal.setPlan(function () {
                        $stageCheckboxs.eq(0).trigger('click');
                        $downPaymentCheckboxs.eq(0).trigger('click');
                    });
                    break;
            }
            changed();
        });

        // 修改价格
        $cartype.on('change', function () {
            var price = ($cartype.val() == '0') ? '敬请期待' : $cartype.val();
            $price.val(price).trigger('change');
        });
        $price.on('change', function () {
            if ($price.val() == '敬请期待') {
                return;
            }
            var price = Number($price.val().replace('元', ''));
            if (isNaN(price)) {
                alert('请输入正确的数字格式！');
                this.focus();
                this.select();
                return false;
            }
            cal.price = price;
            changed();
        }).trigger('change');

        // 手动输入修改首付比例
        $downPaymentRate.on('change', function () {
            var rate = Number($(this).val());
            if (isNaN(rate)) {
                alert('请输入正确的数字格式！');
                this.focus();
                this.select();
                return false;
            }
            cal.downPayRate = Math.min(1, Math.max(0, rate / 100));
            $(this).val(cal.downPayRate * 100);
            changed();
        }).parents('td').on('click', function () {
            if ($downPaymentRate.data('disabled') == 'disabled') {
                return false;
            }
            $downPaymentRate.prop('disabled', '').siblings('label').addClass('d-checked');
            $('#d_loan_downpay_rate_check>span>label').removeClass('d-checked');
        });

        // 选择首付比例
        $downPaymentCheckboxs.on('click', function () {
            var _t = $(this);
            var rate = _t.text().replace('%', '') || '0';
            rate = Number(rate);

            if (_t.attr('disabled') == 'disabled') {
                return false;
            }

            _t.siblings().find('label').removeClass('d-checked');
            _t.find('label').addClass('d-checked');
            if (_t.find('#d_loan_downpay_rate').length == 0) {
                $downPaymentRate.val(rate).prop('disabled', 'disabled').siblings('label').removeClass('d-checked');
                cal.downPayRate = Math.min(1, Math.max(0, rate / 100));
            } else {
                $downPaymentRate.prop('disabled', '').siblings('label').addClass('d-checked');
            }
            changed();
        });

        // 还款期数
        $stageCheckboxs.on('click', function () {
            var _t = $(this);

            if (_t.attr('disabled') == 'disabled') {
                return false;
            }

            var stage = _t.text().replace('期', '') || '12';
            var chargesrate = cal.chargesRateVector['_' + stage];

            _t.siblings().find('label').removeClass('d-checked');
            _t.find('label').addClass('d-checked');
            cal.stage = Number(stage);
            cal.chargesRate = chargesrate;
            changed();
        });

        // 购置税
        $('#d_loan_stage').on('change', function () {
            var stage = Number($(this).val());
            if (isNaN(stage)) {
                alert('请输入正确的数字格式！');
                this.focus();
                this.select();
                return false;
            }
            cal.stage = stage;
            changed();
        });
    });
    // ajax完成
});
